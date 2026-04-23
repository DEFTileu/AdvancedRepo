package com.travel.web.dto.car;

public record CarMarkerDto(
        Long id,
        double lat,
        double lng,
        String brand,
        String model,
        int pricePerHour,
        double rating
) {
}
