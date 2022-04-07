package com.illumivibe.api;

import com.illumivibe.authentication.Credential;
import com.illumivibe.authentication.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;
import java.util.Collections;

@RestController
@RequestMapping("/api")
public class LoginController {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/public/login/oauth/google")
    public Object google(@Validated @RequestBody GoogleInfo loginInfo) {
        String bearer = loginService.loginWithGoogle(loginInfo.idToken);
        return Collections.singletonMap("authHeader", bearer);
    }

    @PostMapping("/user/login/refresh")
    public Object refresh(Credential credential) {
        String bearer = loginService.refreshCredential(credential);
        return Collections.singletonMap("authHeader", bearer);
    }

    private record GoogleInfo(@NotBlank String idToken) {
    }
}
