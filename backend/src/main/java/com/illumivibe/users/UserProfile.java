package com.illumivibe.users;

import javax.annotation.Nullable;
import javax.validation.constraints.NotNull;

public class UserProfile {
    @NotNull
    public final String uid;
    @NotNull
    public final Role role;
    @NotNull
    public String name;
    @Nullable
    public String email;

    public UserProfile(String uid, Role role) {
        this.uid = uid;
        this.role = role;
    }
}
