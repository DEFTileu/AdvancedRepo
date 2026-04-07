package com.travel.web;

import com.travel.service.ApartmentService;
import com.travel.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/markers")
@RequiredArgsConstructor
public class MarkersApiController {

    private final CarService carService;
    private final ApartmentService apartmentService;

    @GetMapping("/cars")
    public List<CarMarkerDto> cars() {
        return carService.available().stream()
                .map(c -> new CarMarkerDto(
                        c.getId(),
                        c.getLatitude(),
                        c.getLongitude(),
                        c.getBrand(),
                        c.getModel(),
                        c.getPricePerHour(),
                        c.getRating()))
                .toList();
    }

    @GetMapping("/apartments")
    public List<ApartmentMarkerDto> apartments() {
        return apartmentService.available().stream()
                .map(a -> new ApartmentMarkerDto(
                        a.getId(),
                        a.getLatitude(),
                        a.getLongitude(),
                        a.getTitle(),
                        a.getPricePerNight(),
                        a.getRating()))
                .toList();
    }
}
