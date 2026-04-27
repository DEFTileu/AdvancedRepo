package com.travel.web;

import com.travel.domain.Apartment;
import com.travel.domain.Car;
import com.travel.service.ApartmentService;
import com.travel.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final CarService carService;
    private final ApartmentService apartmentService;

    @GetMapping
    public String dashboard(Model model) {
        model.addAttribute("cars", carService.all());
        model.addAttribute("apartments", apartmentService.all());
        return "admin/dashboard";
    }

    // ===== Cars =====

    @GetMapping("/cars/new")
    public String newCarForm(Model model) {
        model.addAttribute("car", Car.builder().available(true).build());
        model.addAttribute("mode", "new");
        return "admin/car-form";
    }

    @GetMapping("/cars/{id}/edit")
    public String editCarForm(@PathVariable Long id, Model model) {
        model.addAttribute("car", carService.byId(id));
        model.addAttribute("mode", "edit");
        return "admin/car-form";
    }

    @PostMapping("/cars")
    public String createCar(@RequestParam String brand,
                            @RequestParam String model,
                            @RequestParam int year,
                            @RequestParam int pricePerHour,
                            @RequestParam double latitude,
                            @RequestParam double longitude,
                            @RequestParam String fuelType,
                            @RequestParam int seats,
                            @RequestParam(defaultValue = "4.5") double rating,
                            @RequestParam(defaultValue = "true") boolean available,
                            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        Car car = Car.builder()
                .brand(brand.trim())
                .model(model.trim())
                .year(year)
                .pricePerHour(pricePerHour)
                .latitude(latitude)
                .longitude(longitude)
                .fuelType(fuelType.trim())
                .seats(seats)
                .rating(rating)
                .available(available)
                .build();
        applyImage(image, car::setImageBase64, car::setImageMimeType);
        Car saved = carService.save(car);
        return "redirect:/admin/cars/" + saved.getId() + "/edit";
    }

    @PostMapping("/cars/{id}")
    public String updateCar(@PathVariable Long id,
                            @RequestParam String brand,
                            @RequestParam String model,
                            @RequestParam int year,
                            @RequestParam int pricePerHour,
                            @RequestParam double latitude,
                            @RequestParam double longitude,
                            @RequestParam String fuelType,
                            @RequestParam int seats,
                            @RequestParam(defaultValue = "4.5") double rating,
                            @RequestParam(defaultValue = "false") boolean available,
                            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        Car car = carService.byId(id);
        car.setBrand(brand.trim());
        car.setModel(model.trim());
        car.setYear(year);
        car.setPricePerHour(pricePerHour);
        car.setLatitude(latitude);
        car.setLongitude(longitude);
        car.setFuelType(fuelType.trim());
        car.setSeats(seats);
        car.setRating(rating);
        car.setAvailable(available);
        applyImage(image, car::setImageBase64, car::setImageMimeType);
        carService.save(car);
        return "redirect:/admin/cars/" + id + "/edit";
    }

    @PostMapping("/cars/{id}/delete")
    public String deleteCar(@PathVariable Long id) {
        carService.delete(id);
        return "redirect:/admin";
    }

    // ===== Apartments =====

    @GetMapping("/apartments/new")
    public String newApartmentForm(Model model) {
        model.addAttribute("apartment", Apartment.builder().available(true).build());
        model.addAttribute("mode", "new");
        return "admin/apartment-form";
    }

    @GetMapping("/apartments/{id}/edit")
    public String editApartmentForm(@PathVariable Long id, Model model) {
        model.addAttribute("apartment", apartmentService.byId(id));
        model.addAttribute("mode", "edit");
        return "admin/apartment-form";
    }

    @PostMapping("/apartments")
    public String createApartment(@RequestParam String title,
                                  @RequestParam String address,
                                  @RequestParam int pricePerNight,
                                  @RequestParam double latitude,
                                  @RequestParam double longitude,
                                  @RequestParam int bedrooms,
                                  @RequestParam int guests,
                                  @RequestParam(defaultValue = "4.5") double rating,
                                  @RequestParam(defaultValue = "true") boolean available,
                                  @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        Apartment apt = Apartment.builder()
                .title(title.trim())
                .address(address.trim())
                .pricePerNight(pricePerNight)
                .latitude(latitude)
                .longitude(longitude)
                .bedrooms(bedrooms)
                .guests(guests)
                .rating(rating)
                .available(available)
                .build();
        applyImage(image, apt::setImageBase64, apt::setImageMimeType);
        Apartment saved = apartmentService.save(apt);
        return "redirect:/admin/apartments/" + saved.getId() + "/edit";
    }

    @PostMapping("/apartments/{id}")
    public String updateApartment(@PathVariable Long id,
                                  @RequestParam String title,
                                  @RequestParam String address,
                                  @RequestParam int pricePerNight,
                                  @RequestParam double latitude,
                                  @RequestParam double longitude,
                                  @RequestParam int bedrooms,
                                  @RequestParam int guests,
                                  @RequestParam(defaultValue = "4.5") double rating,
                                  @RequestParam(defaultValue = "false") boolean available,
                                  @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        Apartment apt = apartmentService.byId(id);
        apt.setTitle(title.trim());
        apt.setAddress(address.trim());
        apt.setPricePerNight(pricePerNight);
        apt.setLatitude(latitude);
        apt.setLongitude(longitude);
        apt.setBedrooms(bedrooms);
        apt.setGuests(guests);
        apt.setRating(rating);
        apt.setAvailable(available);
        applyImage(image, apt::setImageBase64, apt::setImageMimeType);
        apartmentService.save(apt);
        return "redirect:/admin/apartments/" + id + "/edit";
    }

    @PostMapping("/apartments/{id}/delete")
    public String deleteApartment(@PathVariable Long id) {
        apartmentService.delete(id);
        return "redirect:/admin";
    }

    // ===== Helpers =====

    private void applyImage(MultipartFile image,
                            java.util.function.Consumer<String> setBase64,
                            java.util.function.Consumer<String> setMime) throws IOException {
        if (image == null || image.isEmpty()) return;
        String mime = image.getContentType();
        if (mime == null || !mime.startsWith("image/")) {
            throw new IllegalArgumentException("Uploaded file is not an image: " + mime);
        }
        byte[] bytes = image.getBytes();
        setBase64.accept(Base64.getEncoder().encodeToString(bytes));
        setMime.accept(mime);
    }
}
