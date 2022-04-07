package com.illumivibe.authentication;

import com.illumivibe.users.Role;

import java.util.Date;

public record Credential(String uid, Role role, Date expires) {

}
