package com.illumivibe.device;

import com.illumivibe.lighteffect.LightEffect;
import com.illumivibe.lighteffect.LightEffectService;
import com.mongodb.client.result.UpdateResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.Resource;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.List;
import java.util.zip.CRC32;

@Service
public class DeviceService {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final LightEffectService lightEffectService;
    @Resource
    private MongoTemplate mongoTemplate;

    @Autowired
    private DeviceService(LightEffectService lightEffectService) {
        this.lightEffectService = lightEffectService;
    }

    public void register(String deviceId) {
        mongoTemplate.save(new Device(deviceId, ""));
    }

    public boolean updateLightEffectId(String deviceId, String lightEffectId) {
        Query query = getDeviceQuery(deviceId);
        Update update = Update.update("lightEffectId", lightEffectId);

        UpdateResult result = mongoTemplate.updateFirst(query, update, Device.class);
        return result.getMatchedCount() > 0;
    }

    public boolean checkExistence(String deviceId) {
        return mongoTemplate.exists(getDeviceQuery(deviceId), Device.class);
    }

    /**
     * @return base-6 encoded
     */
    public String getDeviceContentData(String deviceId) {
        Query query = Query.query(Criteria.where("deviceId").is(deviceId));
        Device device = mongoTemplate.findOne(query, Device.class);
        if (device == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        String lightEffectId = device.lightEffectId;
        LightEffect lightEffect = null;
        if (lightEffectId != null && !lightEffectId.isBlank()) {
            lightEffect = lightEffectService.getLightEffectContent(lightEffectId);
        }

        ByteBuffer buffer = ByteBuffer.allocate(112); // The size comes from the hardware
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        if (lightEffect == null) {
            return Base64Utils.encodeToString(buffer.array());
        }

        int pattern = switch (lightEffect.pattern.trim().toLowerCase()) {
            case "none" -> 0;
            case "static" -> 1;
            case "flashing" -> 2;
            case "shifting" -> 3;
            default -> throw new AssertionError("Unexpected pattern: " + lightEffect.pattern);
        };
        buffer.putInt(pattern);

        if (lightEffect.period < 0) {
            throw new AssertionError("Invalid period");
        }
        buffer.putInt(lightEffect.period / 10);

        if (lightEffect.content.size() > 5) {
            throw new AssertionError("Too many sequences");
        }
        buffer.putInt(lightEffect.content.size());

        for (int i = 0; i < 2; i++) {
            if (i >= lightEffect.content.size()) {
                for (int j = 0; j < 12; j++) {
                    buffer.putInt(0);
                }
            } else {
                List<String> sequence = lightEffect.content.get(i);
                if (sequence.size() != 12) {
                    throw new AssertionError("Sequence size is not 12");
                }
                for (String hex : sequence) {
                    int color = Integer.parseInt(hex.substring(1), 16);
                    buffer.putInt(color);
                }
            }
        }

        CRC32 crc32 = new CRC32();
        crc32.update(buffer.array(), 0, 108);
        int checksum = (int) crc32.getValue();
        buffer.putInt(checksum);

        return Base64Utils.encodeToString(buffer.array());
    }

    private Query getDeviceQuery(String deviceId) {
        return Query.query(Criteria.where("deviceId").is(deviceId));
    }
}
