package com.travel.web.dto.apartment;

import jakarta.validation.constraints.*;

public record UpdateApartmentRequest(
        @NotBlank @Size(max = 128) String title,
        @NotBlank @Size(max = 256) String address,
        @Min(0) int pricePerNight,
        double latitude,
        double longitude,
        @NotBlank @Size(max = 64) String city,
        @Min(0) @Max(20) int bedrooms,
        @Min(1) @Max(50) int guests,
        @DecimalMin("0.0") @DecimalMax("5.0") double rating,
        boolean available) {}
