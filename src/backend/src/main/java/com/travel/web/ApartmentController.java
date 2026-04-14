package com.travel.web;

import com.travel.domain.Booking;
import com.travel.service.ApartmentService;
import com.travel.service.BookingService;
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

import java.time.LocalDateTime;

@Controller
@RequestMapping("/apartments")
@RequiredArgsConstructor
@Validated
public class ApartmentController {

    private final ApartmentService apartmentService;
    private final BookingService bookingService;
    private final UserService userService;

    @GetMapping
    public String list(Model model) {
        model.addAttribute("apartments", apartmentService.available());
        return "apartments/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("apartment", apartmentService.byId(id));
        return "apartments/detail";
    }

    @PostMapping("/{id}/book")
    public String book(@PathVariable Long id,
                       @RequestParam(name = "nights", defaultValue = "2")
                       @Min(1) @Max(30) int nights,
                       Authentication auth) {
        Long userId = userService.byUsername(auth.getName()).getId();
        LocalDateTime start = LocalDateTime.now().plusDays(1);
        LocalDateTime end = start.plusDays(nights);
        Booking booking = bookingService.bookApartment(userId, id, start, end);
        return "redirect:/bookings/" + booking.getId();
    }
}
