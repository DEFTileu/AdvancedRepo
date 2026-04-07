package com.travel.web;

import com.travel.domain.Apartment;
import com.travel.domain.Booking;
import com.travel.domain.Car;

import java.util.Optional;

public record BookingEntry(
        Booking booking,
        Optional<Car> car,
        Optional<Apartment> apartment
) {
}
