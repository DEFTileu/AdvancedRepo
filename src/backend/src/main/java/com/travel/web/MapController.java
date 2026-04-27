package com.travel.web;

import com.travel.config.CityProperties;
import com.travel.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MapController {

    private final CityProperties cityProperties;
    private final RecommendationService recommendationService;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("city", cityProperties);
        model.addAttribute("recommendation", recommendationService.recommend());
        return "map";
    }
}
