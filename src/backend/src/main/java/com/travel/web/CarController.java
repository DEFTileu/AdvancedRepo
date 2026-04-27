package com.travel.web;

import com.travel.domain.Booking;
import com.travel.service.BookingService;
import com.travel.service.CarService;
import com.travel.service.UserService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/cars")
@RequiredArgsConstructor
@Validated
public class CarController {

    private final CarService carService;
    private final BookingService bookingService;
    private final UserService userService;

    @GetMapping
    public String list(Model model) {
        model.addAttribute("cars", carService.available());
        return "cars/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("car", carService.byId(id));
        return "cars/detail";
    }

    @PostMapping("/{id}/book")
    public String book(@PathVariable Long id,
                       @RequestParam(name = "hours", defaultValue = "4")
                       @Min(1) @Max(168) int hours,
                       Authentication auth) {
        Long userId = userService.byUsername(auth.getName()).getId();
        Booking booking = bookingService.bookCar(userId, id, hours);
        return "redirect:/bookings/" + booking.getId();
    }
}
