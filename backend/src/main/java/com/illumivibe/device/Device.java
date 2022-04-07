package com.illumivibe.device;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("devices")
public class Device {
    public String deviceId;
    public String lightEffectId;

    public Device() {
    }

    public Device(String deviceId, String lightEffectId) {
        this.deviceId = deviceId;
        this.lightEffectId = lightEffectId;
    }
}
