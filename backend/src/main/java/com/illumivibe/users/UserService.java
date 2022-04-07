package com.illumivibe.users;

import com.mongodb.client.result.UpdateResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.Nullable;
import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Resource
    private MongoTemplate mongoTemplate;

    @Nullable
    public UserProfile getBasicUserProfileByGoogleId(String googleId) {
        logger.info("Getting basic user profile by google id = {}", googleId);
        Query query = Query.query(Criteria.where("google_id").is(googleId));
        query.fields().include("uid").include("role");
        UserDetail userDetail = mongoTemplate.findOne(query, UserDetail.class);
        if (userDetail != null)
            return userDetail.toUserProfile();
        else
            return null;
    }

    @NotNull
    public UserProfile registerWithGoogle(String googleId, String name, @Nullable String email) {
        UserProfile userProfile = new UserProfile(UserUtil.generateUid(), Role.User);
        userProfile.email = email;
        userProfile.name = name;

        UserDetail userDetail = new UserDetail(userProfile);
        userDetail.googleId = googleId;

        mongoTemplate.save(userDetail);
        return userProfile;
    }

    public void addOrUpdateDevice(String userId, UserDevice device) {
        Query query = userQuery(userId);
        Update update = new Update().set("devices." + device.id, device.name);
        UpdateResult result = mongoTemplate.updateFirst(query, update, UserDetail.class);
        if (result.getMatchedCount() == 0) {
            throw new RuntimeException("User No Found");
        }
    }

    public boolean setActiveDevice(String userId, String deviceId) {
        Criteria userCriteria = Criteria.where("uid").is(userId);
        Criteria deviceRegistered = Criteria.where("devices." + deviceId).exists(true);
        Query query = Query.query(userCriteria.andOperator(deviceRegistered));
        Update update = new Update().set("active_device", deviceId);
        UpdateResult result = mongoTemplate.updateFirst(query, update, UserDetail.class);
        return result.getMatchedCount() > 0;
    }

    public void removeDevice(String userId, String deviceId) {
        Query query = userQuery(userId);
        Update deviceUpdate = new Update().unset("devices." + deviceId);
        UpdateResult result = mongoTemplate.updateFirst(query, deviceUpdate, UserDetail.class);
        if (result.getModifiedCount() == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        /* Remove active device if needed */
        query.addCriteria(Criteria.where("active_device").is(deviceId));
        Update activeUpdate = new Update().set("active_device", "");
        mongoTemplate.updateFirst(query, activeUpdate, UserDetail.class);
    }

    public List<UserDevice> getDevices(String userId) {
        Query query = userQuery(userId);
        query.fields().include("devices");
        UserDetail user = mongoTemplate.findOne(query, UserDetail.class);
        if (user == null) {
            throw new RuntimeException("User No Found");
        }

        List<UserDevice> devices = new ArrayList<>();
        user.devices.forEach((id, name) -> devices.add(new UserDevice(id, name)));
        return devices;
    }

    public UserDevice getActiveDevice(String userId) {
        Query query = userQuery(userId);
        query.fields().include("devices").include("active_device");
        UserDetail user = mongoTemplate.findOne(query, UserDetail.class);
        if (user == null) {
            throw new RuntimeException("User No Found");
        }

        String deviceId = user.activeDevice;
        String deviceName = "";
        for (Map.Entry<String, String> device : user.devices.entrySet()) {
            if (device.getKey().equals(deviceId)) {
                deviceName = device.getValue();
                break;
            }
        }
        if (deviceId == null) {
            deviceId = "";
        }

        return new UserDevice(deviceId, deviceName);
    }

    private Query userQuery(String userId) {
        return Query.query(Criteria.where("uid").is(userId));
    }
}
