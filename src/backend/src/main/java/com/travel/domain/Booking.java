package com.travel.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "booking", indexes = {
    @Index(name = "idx_booking_car_dates", columnList = "carId, startAt, endAt"),
    @Index(name = "idx_booking_apt_dates", columnList = "apartmentId, startAt, endAt"),
    @Index(name = "idx_booking_user", columnList = "userId, createdAt")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private BookingType type;

    private Long userId;
    private Long carId;
    private Long apartmentId;

    private LocalDateTime startAt;
    private LocalDateTime endAt;

    private Integer hours;
    private Integer nights;
    private int totalPrice;
    private String status;
    private LocalDateTime createdAt;
}
