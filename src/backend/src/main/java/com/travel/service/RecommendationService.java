package com.travel.service;

import com.travel.domain.Apartment;
import com.travel.domain.Car;
import com.travel.repo.ApartmentRepository;
import com.travel.repo.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private static final int DEFAULT_HOURS = 24;
    private static final int DEFAULT_NIGHTS = 2;

    private final CarRepository carRepository;
    private final ApartmentRepository apartmentRepository;

    public ComboRecommendation recommend() {
        List<Car> cars = carRepository.findByAvailableTrue();
        List<Apartment> apartments = apartmentRepository.findByAvailableTrue();
        if (cars.isEmpty() || apartments.isEmpty()) {
            return null;
        }

        Car bestCar = cars.stream()
                .min(Comparator
                        .comparingDouble(Car::getRating).reversed()
                        .thenComparingInt(Car::getPricePerHour))
                .orElse(null);

        Apartment bestApartment = apartments.stream()
                .min(Comparator
                        .comparingDouble(Apartment::getRating).reversed()
                        .thenComparingInt(Apartment::getPricePerNight))
                .orElse(null);

        if (bestCar == null || bestApartment == null) {
            return null;
        }

        int total = bestCar.getPricePerHour() * DEFAULT_HOURS
                + bestApartment.getPricePerNight() * DEFAULT_NIGHTS;
        double score = bestCar.getRating() + bestApartment.getRating();

        return ComboRecommendation.builder()
                .car(bestCar)
                .apartment(bestApartment)
                .hours(DEFAULT_HOURS)
                .nights(DEFAULT_NIGHTS)
                .totalPrice(total)
                .score(score)
                .build();
    }
}
