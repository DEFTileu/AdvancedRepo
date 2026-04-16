package com.travel.service;

import org.apache.tika.Tika;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

@Component
public class FileTypeValidator {

    private static final Set<String> ALLOWED_IMAGE_TYPES =
            Set.of("image/jpeg", "image/png", "image/webp");

    private final Tika tika = new Tika();

    public String detect(MultipartFile file) {
        try {
            return tika.detect(file.getInputStream(), file.getOriginalFilename());
        } catch (IOException e) {
            throw new UnsupportedFileTypeException("Could not read uploaded file");
        }
    }

    public String requireImage(MultipartFile file) {
        String detected = detect(file);
        if (!ALLOWED_IMAGE_TYPES.contains(detected)) {
            throw new UnsupportedFileTypeException("Only JPEG, PNG, and WebP images are allowed (got " + detected + ")");
        }
        return detected;
    }
}
