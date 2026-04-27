package com.travel.service;

import com.travel.domain.Car;
import com.travel.repo.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository repo;

    public List<Car> all() {
        return repo.findAll();
    }

    public List<Car> available() {
        return repo.findByAvailableTrue();
    }

    public List<Car> search(String city) {
        if (city == null || city.isBlank()) {
            return repo.findAll();
        }
        return repo.findByCityIgnoreCase(city.trim());
    }

    public Car byId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Car not found: " + id));
    }

    @Transactional
    public Car save(Car car) {
        return repo.save(car);
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Car not found: " + id);
        }
        repo.deleteById(id);
    }
}
