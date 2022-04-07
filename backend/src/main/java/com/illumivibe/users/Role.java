package com.illumivibe.users;

import javax.annotation.Nullable;

public enum Role {
    Stranger(0), User(50), Admin(100);

    public final int level;

    Role(int l) {
        this.level = l;
    }

    @Nullable
    public static Role of(int role) {
        return switch (role) {
            case 0 -> Stranger;
            case 50 -> User;
            case 100 -> Admin;
            default -> null;
        };
    }

    public boolean atLeast(Role r) {
        return this.level >= r.level;
    }
}
