package com.travel.web;

import com.travel.service.ComboRecommendation;
import com.travel.service.RecommendationService;
import com.travel.web.dto.apartment.ApartmentResponse;
import com.travel.web.dto.car.CarResponse;
import com.travel.web.dto.combo.ComboResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/combo")
@RequiredArgsConstructor
public class ComboController {

    private final RecommendationService recommender;

    @GetMapping("/recommended")
    public ResponseEntity<ComboResponse> recommended() {
        ComboRecommendation rec = recommender.recommend();
        if (rec == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(new ComboResponse(
                CarResponse.from(rec.getCar()),
                ApartmentResponse.from(rec.getApartment()),
                0));
    }
}
