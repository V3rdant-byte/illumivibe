package com.illumivibe.api;

import com.illumivibe.lighteffect.LightEffectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;

@RestController
@RequestMapping("/api/user/sharecode")
public class ShareController {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final LightEffectService lightEffectService;

    @Autowired
    public ShareController(LightEffectService lightEffectService) {
        this.lightEffectService = lightEffectService;
    }

    @PostMapping("create")
    public Object create(String userId, @RequestParam String lightEffectId) {
        String shareCode = lightEffectService.share(lightEffectId, userId);
        if (shareCode == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return Collections.singletonMap("code", shareCode);
    }

    @PostMapping("copy")
    public void consume(String userId, @RequestParam String code) {
        boolean success = lightEffectService.copyShared(userId, code);
        if (!success) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
