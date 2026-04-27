package com.travel.web.dto.apartment;

public record ApartmentMarkerDto(Long id, double lat, double lng, int pricePerNight, double rating, boolean available) {}
