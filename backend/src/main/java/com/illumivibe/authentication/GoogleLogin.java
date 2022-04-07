package com.illumivibe.authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
class GoogleLogin {

    private final GoogleIdTokenVerifier verifier;

    GoogleLogin(@Value("${google-client-id}") String clientId) {
        verifier = new GoogleIdTokenVerifier
                .Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    User verifyAndExtract(String idTokenString) throws GeneralSecurityException, IOException {
        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken == null) {
            throw new GeneralSecurityException("Failed to verity the ID Token");
        }
        return new User(idToken.getPayload());
    }

    record User(String id, String name, String email) {
        private User(GoogleIdToken.Payload payload) {
            this(payload.getSubject(), (String) payload.get("name"), payload.getEmail());
        }
    }

}
