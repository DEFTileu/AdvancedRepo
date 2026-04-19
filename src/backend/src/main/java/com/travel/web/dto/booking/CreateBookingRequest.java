package com.travel.web.dto.booking;

import com.travel.domain.BookingType;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateBookingRequest(
        @NotNull BookingType type,
        Long carId,
        Long apartmentId,
        @NotNull @Future LocalDateTime startAt,
        @NotNull @Future LocalDateTime endAt) {

    @AssertTrue(message = "endAt must be after startAt")
    public boolean isRangeValid() {
        return startAt != null && endAt != null && endAt.isAfter(startAt);
    }

    @AssertTrue(message = "carId required for CAR/COMBO bookings")
    public boolean isCarIdProvidedWhenNeeded() {
        if (type == null) return true;
        return switch (type) {
            case CAR, COMBO -> carId != null;
            case APARTMENT -> true;
        };
    }

    @AssertTrue(message = "apartmentId required for APARTMENT/COMBO bookings")
    public boolean isApartmentIdProvidedWhenNeeded() {
        if (type == null) return true;
        return switch (type) {
            case APARTMENT, COMBO -> apartmentId != null;
            case CAR -> true;
        };
    }
}
