package com.travel.web;

import com.travel.service.ApartmentService;
import com.travel.web.dto.apartment.ApartmentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apartments")
@RequiredArgsConstructor
public class ApartmentController {

    private final ApartmentService apartments;

    @GetMapping
    public List<ApartmentResponse> list(@RequestParam(required = false) String city) {
        return apartments.search(city).stream().map(ApartmentResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ApartmentResponse byId(@PathVariable Long id) {
        return ApartmentResponse.from(apartments.byId(id));
    }
}
