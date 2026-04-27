package com.travel.web.dto.booking;

import com.travel.domain.Booking;
import com.travel.domain.BookingType;

import java.time.LocalDateTime;

public record BookingResponse(
        Long id, BookingType type, Long userId,
        Long carId, Long apartmentId,
        LocalDateTime startAt, LocalDateTime endAt,
        Integer hours, Integer nights,
        int totalPrice, String status, LocalDateTime createdAt) {

    public static BookingResponse from(Booking b) {
        return new BookingResponse(
                b.getId(), b.getType(), b.getUserId(),
                b.getCarId(), b.getApartmentId(),
                b.getStartAt(), b.getEndAt(),
                b.getHours(), b.getNights(),
                b.getTotalPrice(), b.getStatus(), b.getCreatedAt());
    }
}
