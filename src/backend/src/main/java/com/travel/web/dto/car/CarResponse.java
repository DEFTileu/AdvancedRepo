package com.travel.web.dto.car;

import com.travel.domain.Car;

public record CarResponse(
        Long id, String brand, String model, int year,
        int pricePerHour, double latitude, double longitude,
        String city, String fuelType, int seats,
        double rating, boolean available,
        String imageUrl) {

    public static CarResponse from(Car c) {
        return new CarResponse(
                c.getId(), c.getBrand(), c.getModel(), c.getYear(),
                c.getPricePerHour(), c.getLatitude(), c.getLongitude(),
                c.getCity(), c.getFuelType(), c.getSeats(),
                c.getRating(), c.isAvailable(),
                "/api/cars/" + c.getId() + "/image");
    }
}
