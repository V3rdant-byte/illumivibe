package com.illumivibe.users;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Collections;
import java.util.Map;

@Document("users")
class UserDetail {
    public String uid = "";
    public int role = 0;
    @Field("google_id")
    public String googleId = "";
    public String name = "";
    public String email = "";
    public Map<String, String> devices = Collections.emptyMap();
    @Field("active_device")
    public String activeDevice = "";

    public UserDetail() {
    }

    public UserDetail(String uid, int role, String name) {
        this.uid = uid;
        this.role = role;
        this.name = name;
    }

    public UserDetail(UserProfile userProfile) {
        this(userProfile.uid, userProfile.role.level, userProfile.name);
        this.email = userProfile.email;
    }

    public UserProfile toUserProfile() {
        UserProfile userProfile = new UserProfile(uid, Role.of(role));
        userProfile.name = name;
        userProfile.email = email;
        return userProfile;
    }

}
