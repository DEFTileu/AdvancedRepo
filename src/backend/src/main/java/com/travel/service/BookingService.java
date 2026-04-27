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

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repo;
    private final CarRepository carRepo;
    private final ApartmentRepository apartmentRepo;

    @Transactional
    public Booking bookCar(Long userId, Long carId, int hours) {
        Car car = carRepo.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found: " + carId));
        if (!car.isAvailable()) {
            throw new IllegalStateException("Car is not available: " + carId);
        }
        car.setAvailable(false);
        carRepo.save(car);

        int total = car.getPricePerHour() * hours;
        return repo.save(Booking.builder()
                .type(BookingType.CAR)
                .userId(userId)
                .carId(carId)
                .hours(hours)
                .totalPrice(total)
                .status("CONFIRMED")
                .createdAt(LocalDateTime.now())
                .build());
    }

    @Transactional
    public Booking bookApartment(Long userId, Long apartmentId, int nights) {
        Apartment apt = apartmentRepo.findById(apartmentId)
                .orElseThrow(() -> new IllegalArgumentException("Apartment not found: " + apartmentId));
        if (!apt.isAvailable()) {
            throw new IllegalStateException("Apartment is not available: " + apartmentId);
        }
        apt.setAvailable(false);
        apartmentRepo.save(apt);

        int total = apt.getPricePerNight() * nights;
        return repo.save(Booking.builder()
                .type(BookingType.APARTMENT)
                .userId(userId)
                .apartmentId(apartmentId)
                .nights(nights)
                .totalPrice(total)
                .status("CONFIRMED")
                .createdAt(LocalDateTime.now())
                .build());
    }

    @Transactional
    public Booking bookCombo(Long userId, Long carId, Long apartmentId, int hours, int nights) {
        Car car = carRepo.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found: " + carId));
        Apartment apt = apartmentRepo.findById(apartmentId)
                .orElseThrow(() -> new IllegalArgumentException("Apartment not found: " + apartmentId));
        if (!car.isAvailable()) {
            throw new IllegalStateException("Car is not available: " + carId);
        }
        if (!apt.isAvailable()) {
            throw new IllegalStateException("Apartment is not available: " + apartmentId);
        }
        car.setAvailable(false);
        apt.setAvailable(false);
        carRepo.save(car);
        apartmentRepo.save(apt);

        int total = car.getPricePerHour() * hours + apt.getPricePerNight() * nights;
        return repo.save(Booking.builder()
                .type(BookingType.COMBO)
                .userId(userId)
                .carId(carId)
                .apartmentId(apartmentId)
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
}
