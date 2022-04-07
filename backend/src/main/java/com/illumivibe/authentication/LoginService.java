package com.illumivibe.authentication;

import com.illumivibe.users.UserProfile;
import com.illumivibe.users.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.management.AttributeNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.security.GeneralSecurityException;

@Service
public class LoginService {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final UserService userService;
    private final GoogleLogin googleLogin;
    private final Jwt jwt;

    @Autowired
    public LoginService(GoogleLogin googleLogin, UserService userService, Jwt jwt) {
        this.googleLogin = googleLogin;
        this.userService = userService;
        this.jwt = jwt;
    }

    public static Credential getRequestCredential() throws AttributeNotFoundException {
        return AuthenticationUtil.getRequestCredential();
    }

    public Credential processCredential(HttpServletRequest request) throws GeneralSecurityException {
        String authToken;
        try {
            authToken = AuthenticationUtil.getAuthToken(request);
        } catch (AttributeNotFoundException e) {
            logger.warn("Missing authorization bearer");
            throw new GeneralSecurityException("Missing authorization bearer");
        }

        Credential credential;
        try {
            credential = jwt.getCredential(authToken);
        } catch (Exception e) {
            logger.warn("Unable to parse the authorization token");
            throw new GeneralSecurityException("Unable to parse the authorization token");
        }

        AuthenticationUtil.setRequestCredential(credential);
        return credential;
    }

    public String loginWithGoogle(String idToken) {
        GoogleLogin.User googleUser;
        try {
            googleUser = googleLogin.verifyAndExtract(idToken);
        } catch (Exception e) {
            logger.warn("Unable to verify ID Token");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to verify ID Token");
        }

        /* Get uid or register new user */
        String googleId = googleUser.id();
        UserProfile user = userService.getBasicUserProfileByGoogleId(googleId);
        if (user == null) {
            user = userService.registerWithGoogle(googleId, googleUser.name(), googleUser.email());
        }

        String authToken = jwt.generate(user.uid, user.role);
        return AuthenticationUtil.getAuthBearer(authToken);
    }

    public String refreshCredential(Credential credential) {
        String authToken = jwt.generate(credential.uid(), credential.role());
        return AuthenticationUtil.getAuthBearer(authToken);
    }
}
