package com.travel.web;

import com.travel.service.CarService;
import com.travel.web.dto.car.CarResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService cars;

    @GetMapping
    public List<CarResponse> list(@RequestParam(required = false) String city) {
        return cars.search(city).stream().map(CarResponse::from).toList();
    }

    @GetMapping("/{id}")
    public CarResponse byId(@PathVariable Long id) {
        return CarResponse.from(cars.byId(id));
    }
}
