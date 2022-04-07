package com.illumivibe.spotify;

import se.michaelthelin.spotify.model_objects.specification.ArtistSimplified;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.util.Arrays;
import java.util.stream.Collectors;

public class SimpleTrack {
    public final String id;
    public final String name;
    public final String artist;

    public SimpleTrack(String id, String name, String artist) {
        this.id = id;
        this.name = name;
        this.artist = artist;
    }

    public static SimpleTrack create(Track track) {
        String id = track.getId();
        String name = track.getName();
        String artist = Arrays.stream(track.getArtists())
                .map(ArtistSimplified::getName)
                .collect(Collectors.joining(", "));
        return new SimpleTrack(id, name, artist);
    }
}
