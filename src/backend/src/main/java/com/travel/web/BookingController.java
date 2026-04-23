package com.travel.web;

import com.travel.service.BookingService;
import com.travel.service.UserService;
import com.travel.web.dto.booking.BookingResponse;
import com.travel.web.dto.booking.CreateBookingRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookings;
    private final UserService users;

    @GetMapping
    public List<BookingResponse> mine(Authentication auth) {
        Long userId = users.byUsername(auth.getName()).getId();
        return bookings.recentForUser(userId).stream().map(BookingResponse::from).toList();
    }

    @GetMapping("/{id}")
    public BookingResponse byId(@PathVariable Long id, Authentication auth) {
        var b = bookings.byId(id);
        Long userId = users.byUsername(auth.getName()).getId();
        if (b.getUserId() == null || !b.getUserId().equals(userId)) {
            throw new AccessDeniedException("This booking belongs to another user");
        }
        return BookingResponse.from(b);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest req, Authentication auth) {
        Long userId = users.byUsername(auth.getName()).getId();
        var b = switch (req.type()) {
            case CAR -> bookings.bookCar(userId, req.carId(), req.startAt(), req.endAt());
            case APARTMENT -> bookings.bookApartment(userId, req.apartmentId(), req.startAt(), req.endAt());
            case COMBO -> bookings.bookCombo(userId, req.carId(), req.apartmentId(),
                    req.startAt(), req.endAt(), req.startAt(), req.endAt());
        };
        return BookingResponse.from(b);
    }
}
