package com.illumivibe.authentication;

import com.illumivibe.util.RequestContext;

import javax.management.AttributeNotFoundException;
import javax.servlet.http.HttpServletRequest;

class AuthenticationUtil {
    private static final String AUTH_HEADER = "Authorization";
    private static final String AUTH_HEADER_PREFIX = "Bearer ";
    private static final String ATTRIBUTE_NAME = "IV_REQUEST_CRED";

    static Credential getRequestCredential() throws AttributeNotFoundException {
        return (Credential) RequestContext.get(ATTRIBUTE_NAME);
    }

    static void setRequestCredential(Credential credential) {
        RequestContext.set(ATTRIBUTE_NAME, credential);
    }

    static String getAuthToken(HttpServletRequest request) throws AttributeNotFoundException {
        String header = request.getHeader(AUTH_HEADER);
        if (header == null || !header.startsWith(AUTH_HEADER_PREFIX)) {
            throw new AttributeNotFoundException("Missing authorization bearer");
        }
        return header.substring(AUTH_HEADER_PREFIX.length());
    }

    static String getAuthBearer(String token) {
        return AUTH_HEADER_PREFIX + token;
    }
}
