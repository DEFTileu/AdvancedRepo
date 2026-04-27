package com.travel.web.dto.car;

import jakarta.validation.constraints.*;

public record UpdateCarRequest(
        @NotBlank @Size(max = 64) String brand,
        @NotBlank @Size(max = 64) String model,
        @Min(1990) @Max(2100) int year,
        @Min(0) int pricePerHour,
        double latitude,
        double longitude,
        @NotBlank @Size(max = 32) String fuelType,
        @Min(1) @Max(20) int seats,
        @DecimalMin("0.0") @DecimalMax("5.0") double rating,
        boolean available,
        @NotBlank @Size(max = 64) String city) {}
