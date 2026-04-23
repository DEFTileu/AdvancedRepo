package com.travel.web;

import com.travel.domain.Apartment;
import com.travel.domain.Car;
import com.travel.service.ApartmentService;
import com.travel.service.CarService;
import com.travel.service.FileTypeValidator;
import com.travel.web.dto.apartment.ApartmentResponse;
import com.travel.web.dto.apartment.CreateApartmentRequest;
import com.travel.web.dto.apartment.UpdateApartmentRequest;
import com.travel.web.dto.car.CarResponse;
import com.travel.web.dto.car.CreateCarRequest;
import com.travel.web.dto.car.UpdateCarRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final CarService cars;
    private final ApartmentService apartments;
    private final FileTypeValidator fileValidator;

    // ------- Cars -------

    @PostMapping("/cars")
    @ResponseStatus(HttpStatus.CREATED)
    public CarResponse createCar(@Valid @RequestBody CreateCarRequest req) {
        Car c = Car.builder()
                .brand(req.brand()).model(req.model()).year(req.year())
                .pricePerHour(req.pricePerHour())
                .latitude(req.latitude()).longitude(req.longitude())
                .city(req.city()).fuelType(req.fuelType()).seats(req.seats())
                .rating(req.rating()).available(req.available())
                .build();
        return CarResponse.from(cars.save(c));
    }

    @PutMapping("/cars/{id}")
    public CarResponse updateCar(@PathVariable Long id, @Valid @RequestBody UpdateCarRequest req) {
        Car c = cars.byId(id);
        c.setBrand(req.brand()); c.setModel(req.model()); c.setYear(req.year());
        c.setPricePerHour(req.pricePerHour());
        c.setLatitude(req.latitude()); c.setLongitude(req.longitude());
        c.setCity(req.city()); c.setFuelType(req.fuelType()); c.setSeats(req.seats());
        c.setRating(req.rating()); c.setAvailable(req.available());
        return CarResponse.from(cars.save(c));
    }

    @PostMapping(path = "/cars/{id}/image", consumes = "multipart/form-data")
    public void uploadCarImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) throws IOException {
        String mime = fileValidator.requireImage(image);
        Car c = cars.byId(id);
        c.setImageBase64(Base64.getEncoder().encodeToString(image.getBytes()));
        c.setImageMimeType(mime);
        cars.save(c);
    }

    @DeleteMapping("/cars/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCar(@PathVariable Long id) { cars.delete(id); }

    // ------- Apartments -------

    @PostMapping("/apartments")
    @ResponseStatus(HttpStatus.CREATED)
    public ApartmentResponse createApt(@Valid @RequestBody CreateApartmentRequest req) {
        Apartment a = Apartment.builder()
                .title(req.title()).address(req.address())
                .pricePerNight(req.pricePerNight())
                .latitude(req.latitude()).longitude(req.longitude())
                .city(req.city()).bedrooms(req.bedrooms()).guests(req.guests())
                .rating(req.rating()).available(req.available())
                .build();
        return ApartmentResponse.from(apartments.save(a));
    }

    @PutMapping("/apartments/{id}")
    public ApartmentResponse updateApt(@PathVariable Long id, @Valid @RequestBody UpdateApartmentRequest req) {
        Apartment a = apartments.byId(id);
        a.setTitle(req.title()); a.setAddress(req.address());
        a.setPricePerNight(req.pricePerNight());
        a.setLatitude(req.latitude()); a.setLongitude(req.longitude());
        a.setCity(req.city()); a.setBedrooms(req.bedrooms()); a.setGuests(req.guests());
        a.setRating(req.rating()); a.setAvailable(req.available());
        return ApartmentResponse.from(apartments.save(a));
    }

    @PostMapping(path = "/apartments/{id}/image", consumes = "multipart/form-data")
    public void uploadAptImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) throws IOException {
        String mime = fileValidator.requireImage(image);
        Apartment a = apartments.byId(id);
        a.setImageBase64(Base64.getEncoder().encodeToString(image.getBytes()));
        a.setImageMimeType(mime);
        apartments.save(a);
    }

    @DeleteMapping("/apartments/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteApt(@PathVariable Long id) { apartments.delete(id); }
}
