package com.illumivibe.api;

import com.illumivibe.lighteffect.LightEffectService;
import com.illumivibe.spotify.SimpleTrack;
import com.illumivibe.spotify.SpotifyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;

import java.util.List;

@RestController
@RequestMapping("/api/user/spotify/")
public class SpotifyController {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final SpotifyService spotifyService;
    private final LightEffectService lightEffectService;

    @Autowired
    public SpotifyController(SpotifyService spotifyService, LightEffectService lightEffectService) {
        this.spotifyService = spotifyService;
        this.lightEffectService = lightEffectService;
    }

    @GetMapping("/search")
    public List<SimpleTrack> search(@RequestParam String track) throws Exception {
        return spotifyService.search(track);
    }

    @PostMapping("/generate")
    public void generate(String userId, @RequestParam String trackId) throws Exception {
        trackId = trackId.replace("\"", "");
        SimpleTrack track = spotifyService.getTrack(trackId);
        AudioFeatures features = spotifyService.getTrackFeatures(trackId);
        lightEffectService.generate(userId, features, track);
    }
}
