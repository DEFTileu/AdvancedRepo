package com.travel.service;

import com.travel.domain.Apartment;
import com.travel.domain.Booking;
import com.travel.domain.BookingType;
import com.travel.domain.Car;
import com.travel.repo.ApartmentRepository;
import com.travel.repo.BookingRepository;
import com.travel.repo.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repo;
    private final CarRepository carRepo;
    private final ApartmentRepository apartmentRepo;

    @Transactional
    public Booking bookCar(Long userId, Long carId, LocalDateTime start, LocalDateTime end) {
        validateRange(start, end);
        // Acquire pessimistic write lock on the target car row so concurrent bookings
        // for the same car serialize through the overlap check.
        Car car = carRepo.findByIdForUpdate(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found: " + carId));
        if (!repo.findOverlappingForCar(carId, start, end).isEmpty()) {
            throw new BookingConflictException("Car already booked for these dates");
        }
        int hours = (int) Math.max(1, Duration.between(start, end).toHours());
        int total = car.getPricePerHour() * hours;
        return repo.save(Booking.builder()
                .type(BookingType.CAR)
                .userId(userId)
                .carId(carId)
                .startAt(start)
                .endAt(end)
                .hours(hours)
                .totalPrice(total)
                .status("CONFIRMED")
                .createdAt(LocalDateTime.now())
                .build());
    }

    @Transactional
    public Booking bookApartment(Long userId, Long apartmentId, LocalDateTime start, LocalDateTime end) {
        validateRange(start, end);
        Apartment apt = apartmentRepo.findByIdForUpdate(apartmentId)
                .orElseThrow(() -> new IllegalArgumentException("Apartment not found: " + apartmentId));
        if (!repo.findOverlappingForApartment(apartmentId, start, end).isEmpty()) {
            throw new BookingConflictException("Apartment already booked for these dates");
        }
        int nights = (int) Math.max(1, Duration.between(start, end).toDays());
        int total = apt.getPricePerNight() * nights;
        return repo.save(Booking.builder()
                .type(BookingType.APARTMENT)
                .userId(userId)
                .apartmentId(apartmentId)
                .startAt(start)
                .endAt(end)
                .nights(nights)
                .totalPrice(total)
                .status("CONFIRMED")
                .createdAt(LocalDateTime.now())
                .build());
    }

    @Transactional
    public Booking bookCombo(Long userId, Long carId, Long apartmentId,
                             LocalDateTime carStart, LocalDateTime carEnd,
                             LocalDateTime aptStart, LocalDateTime aptEnd) {
        validateRange(carStart, carEnd);
        validateRange(aptStart, aptEnd);
        Car car = carRepo.findByIdForUpdate(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found: " + carId));
        Apartment apt = apartmentRepo.findByIdForUpdate(apartmentId)
                .orElseThrow(() -> new IllegalArgumentException("Apartment not found: " + apartmentId));
        if (!repo.findOverlappingForCar(carId, carStart, carEnd).isEmpty()) {
            throw new BookingConflictException("Car already booked for these dates");
        }
        if (!repo.findOverlappingForApartment(apartmentId, aptStart, aptEnd).isEmpty()) {
            throw new BookingConflictException("Apartment already booked for these dates");
        }
        int hours = (int) Math.max(1, Duration.between(carStart, carEnd).toHours());
        int nights = (int) Math.max(1, Duration.between(aptStart, aptEnd).toDays());
        int total = car.getPricePerHour() * hours + apt.getPricePerNight() * nights;
        return repo.save(Booking.builder()
                .type(BookingType.COMBO)
                .userId(userId)
                .carId(carId)
                .apartmentId(apartmentId)
                .startAt(carStart)
                .endAt(aptEnd)
                .hours(hours)
                .nights(nights)
                .totalPrice(total)
                .status("CONFIRMED")
                .createdAt(LocalDateTime.now())
                .build());
    }

    public Booking byId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + id));
    }

    public List<Booking> recent() {
        return repo.findAllByOrderByCreatedAtDesc();
    }

    public List<Booking> recentForUser(Long userId) {
        return repo.findAllByUserIdOrderByCreatedAtDesc(userId);
    }

    private void validateRange(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null || !end.isAfter(start)) {
            throw new IllegalArgumentException("End must be after start");
        }
    }
}
