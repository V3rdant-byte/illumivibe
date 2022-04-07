package com.illumivibe.users;

import java.util.UUID;

class UserUtil {
    public static String generateUid() {
        return UUID.randomUUID().toString();
    }
}
