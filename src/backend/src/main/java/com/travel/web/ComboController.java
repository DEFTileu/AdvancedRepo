package com.travel.web;

import com.travel.domain.Booking;
import com.travel.service.BookingService;
import com.travel.service.RecommendationService;
import com.travel.service.UserService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/combo")
@RequiredArgsConstructor
@Validated
public class ComboController {

    private final RecommendationService recommendationService;
    private final BookingService bookingService;
    private final UserService userService;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("recommendation", recommendationService.recommend());
        return "combo/index";
    }

    @PostMapping("/book")
    public String book(@RequestParam Long carId,
                       @RequestParam Long apartmentId,
                       @RequestParam(defaultValue = "24") @Min(1) @Max(168) int hours,
                       @RequestParam(defaultValue = "2") @Min(1) @Max(30) int nights,
                       Authentication auth) {
        Long userId = userService.byUsername(auth.getName()).getId();
        Booking booking = bookingService.bookCombo(userId, carId, apartmentId, hours, nights);
        return "redirect:/bookings/" + booking.getId();
    }
}
