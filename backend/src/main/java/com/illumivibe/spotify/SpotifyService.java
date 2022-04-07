package com.illumivibe.spotify;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.detailed.BadRequestException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpotifyService {
    private static final Logger logger = LoggerFactory.getLogger(SpotifyService.class);

    private final SpotifyApi spotify;
    private final ClientCredentialsRequest credentialsRequest;
    private Date tokenExpireDate;

    @Autowired
    private SpotifyService(@Value("${spotify.client-id}") String clientId,
                           @Value("${spotify.client-secret}") String clientSecret) {
        spotify = new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .build();
        credentialsRequest = spotify.clientCredentials().build();
        tokenExpireDate = new Date();
    }

    private void fetchAccessTokenIfNeeded() throws Exception {
        if (tokenRefreshNeeded()) {
            synchronized (credentialsRequest) {
                if (tokenRefreshNeeded()) {
                    ClientCredentials clientCredentials = credentialsRequest.execute();
                    spotify.setAccessToken(clientCredentials.getAccessToken());
                    tokenExpireDate = new Date(System.currentTimeMillis() + clientCredentials.getExpiresIn() * 1000);
                    logger.info("ClientCredentials expires in: " + clientCredentials.getExpiresIn());
                }
            }
        }
    }

    public List<SimpleTrack> search(String query) throws Exception {
        fetchAccessTokenIfNeeded();

        Paging<Track> trackPaging;
        try {
            trackPaging = spotify.searchTracks(query).build().execute();
        } catch (BadRequestException e) {
            logger.warn("getAudioFeaturesForTrack bad request");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return Arrays.stream(trackPaging.getItems())
                .map(SimpleTrack::create)
                .collect(Collectors.toList());
    }

    /**
     * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features
     *
     * @param id
     * @return
     * @throws Exception
     */
    public AudioFeatures getTrackFeatures(String id) throws Exception {
        fetchAccessTokenIfNeeded();

        try {
            return spotify.getAudioFeaturesForTrack(id).build().execute();
        } catch (BadRequestException e) {
            logger.warn("getAudioFeaturesForTrack bad request");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    public SimpleTrack getTrack(String id) throws Exception {
        fetchAccessTokenIfNeeded();

        Track track;
        try {
            track = spotify.getTrack(id).build().execute();
        } catch (BadRequestException e) {
            logger.warn("getAudioFeaturesForTrack bad request");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return SimpleTrack.create(track);
    }

    private boolean tokenRefreshNeeded() {
        return tokenExpireDate.getTime() - System.currentTimeMillis() < 600 * 1000;
    }

}
