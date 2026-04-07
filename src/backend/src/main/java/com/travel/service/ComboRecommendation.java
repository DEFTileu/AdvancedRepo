package com.travel.service;

import com.travel.domain.Apartment;
import com.travel.domain.Car;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ComboRecommendation {
    private Car car;
    private Apartment apartment;
    private int hours;
    private int nights;
    private int totalPrice;
    private double score;
}
