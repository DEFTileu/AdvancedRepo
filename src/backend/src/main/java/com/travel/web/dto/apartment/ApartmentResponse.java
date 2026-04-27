package com.travel.web.dto.apartment;

import com.travel.domain.Apartment;

public record ApartmentResponse(
        Long id, String title, String address,
        int pricePerNight, double latitude, double longitude,
        String city, int bedrooms, int guests,
        double rating, boolean available,
        String imageUrl) {

    public static ApartmentResponse from(Apartment a) {
        return new ApartmentResponse(
                a.getId(), a.getTitle(), a.getAddress(),
                a.getPricePerNight(), a.getLatitude(), a.getLongitude(),
                a.getCity(), a.getBedrooms(), a.getGuests(),
                a.getRating(), a.isAvailable(),
                "/api/apartments/" + a.getId() + "/image");
    }
}
