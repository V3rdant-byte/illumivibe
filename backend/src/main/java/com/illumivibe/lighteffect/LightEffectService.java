package com.illumivibe.lighteffect;

import com.illumivibe.spotify.SimpleTrack;
import com.mongodb.client.result.DeleteResult;
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
import org.springframework.web.server.ResponseStatusException;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;

import javax.annotation.Nullable;
import javax.annotation.Resource;
import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class LightEffectService {
    private static final double THRESHOLD_DANCE = 0.6;
    private static final double THRESHOLD_VALENCE = 0.25;
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Resource
    private MongoTemplate mongoTemplate;

    @Autowired
    private LightEffectService() {
    }

    public List<LightEffect> query(LightEffectQuery userQuery, String userId) {
        Criteria criteria = Criteria.where("owner").is(userId);
        if (userQuery != null && userQuery.tags != null && !userQuery.tags.isEmpty()) {
            criteria.and("tags").all(userQuery.tags);
        }
        Query query = Query.query(criteria);
        query.fields().exclude("content");

        return mongoTemplate.find(query, LightEffect.class);
    }

    /**
     * Create a new light effect based on the given light effect
     *
     * @param template might be modified
     * @return the new light effect
     */
    public LightEffect createLightEffect(LightEffect template, String owner) {
        template.id = null;
        template.owner = owner;
        if (template.name == null || template.name.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (template.tags == null) {
            template.tags = Collections.emptyList();
        }
        return mongoTemplate.save(template);
    }

    @Nullable
    public LightEffect getDetail(String lightEffectId, String userId) {
        Query query = getQuery(lightEffectId, userId);
        return mongoTemplate.findOne(query, LightEffect.class);
    }

    @Nullable
    public LightEffect getLightEffectContent(String lightEffectId) {
        Query query = Query.query(Criteria.where("_id").is(lightEffectId));
        query.fields().include("period", "pattern", "content");
        return mongoTemplate.findOne(query, LightEffect.class);
    }

    public boolean delete(String lightEffectId, String userId) {
        Query query = getQuery(lightEffectId, userId);
        DeleteResult result = mongoTemplate.remove(query, LightEffect.class);
        return result.getDeletedCount() > 0;
    }

    public boolean update(String lightEffectId, String userId, LightEffect userUpdate) {
        Query query = getQuery(lightEffectId, userId);
        Update update = userUpdate.convertToUpdate();

        UpdateResult result = mongoTemplate.updateFirst(query, update, LightEffect.class);
        return result.getMatchedCount() > 0;
    }

    public String share(String lightEffectId, String userId) {
        Query query = getQuery(lightEffectId, userId);
        Update update = Update.update("shared", true);
        UpdateResult result = mongoTemplate.updateFirst(query, update, LightEffect.class);
        if (result.getMatchedCount() > 0) {
            return lightEffectId;
        }
        return null;
    }

    public boolean copyShared(String userId, String shareCode) {
        Query query = Query.query(Criteria
                .where("_id").is(shareCode)
                .and("shared").is(true)
        );
        LightEffect sharedEffect = mongoTemplate.findOne(query, LightEffect.class);
        if (sharedEffect == null) {
            return false;
        }
        LightEffect copiedEffect = createLightEffect(sharedEffect, userId);
        if (copiedEffect == null) {
            throw new RuntimeException("Unable to copy light effect");
        }
        return true;
    }

    public void generate(String userId, AudioFeatures features, SimpleTrack track) {
        logger.info(features.toString());
        LightEffect lightEffect = new LightEffect();
        lightEffect.owner = userId;
        lightEffect.name = track.name + " - " + track.artist;
        lightEffect.tags = Collections.singletonList("auto generated");

        lightEffect.content = new ArrayList<>();
        if (features.getValence() > THRESHOLD_VALENCE) {
            lightEffect.content.add(generateWarmSequence(1, 1));
        } else {
            lightEffect.content.add(generateCoolSequence(1, 1));
        }
        if (features.getDanceability() > THRESHOLD_DANCE) {
            lightEffect.pattern = "flashing";
            if (features.getValence() > THRESHOLD_VALENCE) {
                lightEffect.content.add(generateWarmSequence(1f, 0.3f));
            } else {
                lightEffect.content.add(generateCoolSequence(1f, 0.3f));
            }
        } else {
            lightEffect.pattern = "shifting";
        }
        // 2 beats
        lightEffect.period = (int) (1000 / (features.getTempo() / 60.0));

        mongoTemplate.save(lightEffect);
    }

    private List<String> generateCoolSequence(float saturation, float brightness) {
        List<String> result = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            result.add(generateCoolColor(saturation, brightness));
        }
        return result;
    }

    private List<String> generateWarmSequence(float saturation, float brightness) {
        List<String> result = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            result.add(generateWarmColor(saturation, brightness));
        }
        return result;
    }

    private String generateCoolColor(float saturation, float brightness) {
        double hue = 0.25 + Math.random() * (0.75 - 0.25);
        return generateColor((float) hue, saturation, brightness);
    }

    private String generateWarmColor(float saturation, float brightness) {
        double hue = 0.83 + Math.random() * (1.17 - 0.83);
        return generateColor((float) hue, saturation, brightness);
    }

    private String generateColor(float hue, float saturation, float brightness) {
        Color color = Color.getHSBColor(hue, saturation, brightness);
        return String.format("#%02x%02x%02x", color.getRed(), color.getGreen(), color.getBlue());
    }

    private Query getQuery(String lightEffectId, String userId) {
        Criteria lid = Criteria.where("_id").is(lightEffectId);
        Criteria uid = Criteria.where("owner").is(userId);
        return Query.query(lid.andOperator(uid));
    }
}
