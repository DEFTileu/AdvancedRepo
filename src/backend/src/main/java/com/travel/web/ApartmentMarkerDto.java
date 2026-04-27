package com.travel.web;

public record ApartmentMarkerDto(
        Long id,
        double lat,
        double lng,
        String title,
        int pricePerNight,
        double rating
) {
}
