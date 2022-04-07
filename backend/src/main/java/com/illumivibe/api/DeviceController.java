package com.illumivibe.api;

import com.illumivibe.device.DeviceService;
import com.illumivibe.users.UserDevice;
import com.illumivibe.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DeviceController {
    private final DeviceService deviceService;
    private final UserService userService;

    @Autowired
    private DeviceController(DeviceService deviceService, UserService userService) {
        this.deviceService = deviceService;
        this.userService = userService;
    }

    @PutMapping("/admin/device/{deviceId}/register")
    public void register(@PathVariable String deviceId) {
        deviceService.register(deviceId);
    }

    @GetMapping("/user/device/list")
    public Object list(String userId) {
        List<UserDevice> deviceList = userService.getDevices(userId);
        return Collections.singletonMap("devices", deviceList);
    }

    @PutMapping("/user/device/put")
    public void addOrUpdateDevice(String userId, @Validated @RequestBody UserDevice device) {
        if (!deviceService.checkExistence(device.id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        userService.addOrUpdateDevice(userId, device);
    }

    @GetMapping("/user/device/get-active")
    public Object getActive(String userId) {
        return userService.getActiveDevice(userId);
    }

    @DeleteMapping("/user/device/{deviceId}/remove")
    public void remove(String userId, @PathVariable String deviceId) {
        userService.removeDevice(userId, deviceId);
    }

    @PutMapping("/user/device/{deviceId}/set-active")
    public void setActive(String userId, @PathVariable String deviceId) {
        boolean success = userService.setActiveDevice(userId, deviceId);
        if (!success) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/user/device/{deviceId}/light-effect")
    public void setLightEffect(String userId, @PathVariable String deviceId, @RequestParam String lightEffectId) {
        if (deviceId.equals("current-active")) {
            deviceId = userService.getActiveDevice(userId).id;
        }
        boolean success = deviceService.updateLightEffectId(deviceId, lightEffectId);
        if (!success) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/public/device/{deviceId}/light-effect/content")
    public String getLightEffect(@PathVariable String deviceId) {
        return deviceService.getDeviceContentData(deviceId);
    }
}
