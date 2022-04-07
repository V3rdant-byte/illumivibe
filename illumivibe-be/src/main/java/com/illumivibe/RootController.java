package com.illumivibe;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class RootController {

    @Value("${frontend-url}")
    private String frontendURL;

    @GetMapping("/")
    public void root(HttpServletResponse response) {
        response.setHeader("Location", frontendURL);
        response.setStatus(302);
    }

}
