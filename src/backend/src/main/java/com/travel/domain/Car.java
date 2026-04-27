package com.travel.domain;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
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

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "TEXT")
    private String imageBase64;

    private String imageMimeType;

    private double rating;
    private boolean available;
    private String fuelType;
    private int seats;
}
