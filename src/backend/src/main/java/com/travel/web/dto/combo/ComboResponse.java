package com.travel.web.dto.combo;

import com.travel.web.dto.apartment.ApartmentResponse;
import com.travel.web.dto.car.CarResponse;

public record ComboResponse(CarResponse car, ApartmentResponse apartment, int estimatedSavings) {}
