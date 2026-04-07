package com.travel.web;

import com.travel.domain.Booking;
import com.travel.repo.ApartmentRepository;
import com.travel.repo.CarRepository;
import com.travel.service.BookingService;
import com.travel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final CarRepository carRepository;
    private final ApartmentRepository apartmentRepository;
    private final UserService userService;

    @GetMapping
    public String list(Authentication auth, Model model) {
        Long userId = userService.byUsername(auth.getName()).getId();
        List<BookingEntry> entries = bookingService.recentForUser(userId).stream()
                .map(this::toEntry)
                .toList();
        model.addAttribute("entries", entries);
        return "bookings/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Authentication auth, Model model) {
        Booking booking = bookingService.byId(id);
        Long userId = userService.byUsername(auth.getName()).getId();
        if (booking.getUserId() != null && !booking.getUserId().equals(userId)) {
            throw new AccessDeniedException("This booking belongs to another user");
        }
        model.addAttribute("booking", booking);
        model.addAttribute("car",
                booking.getCarId() == null
                        ? null
                        : carRepository.findById(booking.getCarId()).orElse(null));
        model.addAttribute("apartment",
                booking.getApartmentId() == null
                        ? null
                        : apartmentRepository.findById(booking.getApartmentId()).orElse(null));
        return "bookings/detail";
    }

    private BookingEntry toEntry(Booking booking) {
        return new BookingEntry(
                booking,
                booking.getCarId() == null
                        ? Optional.empty()
                        : carRepository.findById(booking.getCarId()),
                booking.getApartmentId() == null
                        ? Optional.empty()
                        : apartmentRepository.findById(booking.getApartmentId())
        );
    }
}
