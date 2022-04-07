package com.illumivibe.api;

import com.illumivibe.authentication.Credential;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/public/alive")
    public void alive() {
    }

    @GetMapping("/user/test-login")
    public Object loginTest(Credential credential) {
        return Map.of(
                "uid", credential.uid(),
                "role", credential.role().level,
                "expires", credential.expires().getTime()
        );
    }
}
