package com.travel.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "car", indexes = {
    @Index(name = "idx_car_city_avail_price", columnList = "city, available, pricePerHour")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private Long version;

    private String brand;
    private String model;

    @Column(name = "model_year")
    private int year;

    private int pricePerHour;
    private double latitude;
    private double longitude;

    @Column(columnDefinition = "TEXT")
    private String imageBase64;

    private String imageMimeType;

    private double rating;
    private boolean available;
    private String fuelType;
    private int seats;

    @Column(length = 64)
    private String city;
}
