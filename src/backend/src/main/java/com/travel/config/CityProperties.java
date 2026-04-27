package com.travel.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("travel.city")
public record CityProperties(
        String name,
        double latitude,
        double longitude,
        int zoom
) {
}
