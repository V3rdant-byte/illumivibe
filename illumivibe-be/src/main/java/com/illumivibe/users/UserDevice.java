package com.illumivibe.users;

import javax.validation.constraints.NotBlank;

public class UserDevice {
    @NotBlank
    public String id;
    @NotBlank
    public String name;

    public UserDevice() {
    }

    public UserDevice(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
