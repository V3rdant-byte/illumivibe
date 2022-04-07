package com.illumivibe.api;

import com.illumivibe.lighteffect.LightEffect;
import com.illumivibe.lighteffect.LightEffectQuery;
import com.illumivibe.lighteffect.LightEffectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/user/light-effect")
public class LightEffectController {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final LightEffectService lightEffectService;

    @Autowired
    public LightEffectController(LightEffectService lightEffectService) {
        this.lightEffectService = lightEffectService;
    }

    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST}, path = "/query")
    public Object query(String userId, @RequestBody(required = false) LightEffectQuery query) {
        List<LightEffect> result = lightEffectService.query(query, userId);
        return Collections.singletonMap("lighteffects", result);
    }

    @PostMapping("/create")
    public LightEffect create(String userId, @NotNull @RequestBody LightEffect template) {
        return lightEffectService.createLightEffect(template, userId);
    }

    @GetMapping("/{lightEffectId}/detail")
    public LightEffect getDetail(String userId, @NotNull @PathVariable String lightEffectId) {
        LightEffect result = lightEffectService.getDetail(lightEffectId, userId);
        if (result == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @PutMapping("/{lightEffectId}/update")
    public void update(String userId, @PathVariable String lightEffectId, @NotNull @RequestBody LightEffect detail) {
        boolean success = lightEffectService.update(lightEffectId, userId, detail);
        if (!success) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{lightEffectId}/delete")
    public void delete(String userId, @PathVariable String lightEffectId) {
        boolean success = lightEffectService.delete(lightEffectId, userId);
        if (!success) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
