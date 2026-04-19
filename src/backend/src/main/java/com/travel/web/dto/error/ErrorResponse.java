package com.travel.web.dto.error;

import java.util.Map;

public record ErrorResponse(String error, String message, Map<String, String> fields) {
    public static ErrorResponse of(String error, String message) {
        return new ErrorResponse(error, message, Map.of());
    }
}
