package com.travel.web;

import com.travel.service.ApartmentService;
import com.travel.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Base64;

@Controller
@RequiredArgsConstructor
public class ImageController {

    private final CarService carService;
    private final ApartmentService apartmentService;

    @GetMapping("/cars/{id}/image")
    public ResponseEntity<byte[]> carImage(@PathVariable Long id) {
        var car = carService.byId(id);
        return image(car.getImageBase64(), car.getImageMimeType());
    }

    @GetMapping("/apartments/{id}/image")
    public ResponseEntity<byte[]> apartmentImage(@PathVariable Long id) {
        var apt = apartmentService.byId(id);
        return image(apt.getImageBase64(), apt.getImageMimeType());
    }

    private ResponseEntity<byte[]> image(String base64, String mime) {
        if (base64 == null || base64.isBlank()) {
            return ResponseEntity.notFound().build();
        }
        byte[] bytes = Base64.getDecoder().decode(base64);
        MediaType type = mime != null ? MediaType.parseMediaType(mime) : MediaType.IMAGE_JPEG;
        return ResponseEntity.ok()
                .contentType(type)
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=86400")
                .body(bytes);
    }
}
