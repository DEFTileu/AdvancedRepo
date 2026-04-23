package com.travel.web;

import com.travel.domain.User;
import com.travel.service.UserService;
import com.travel.web.dto.auth.RegisterRequest;
import com.travel.web.dto.auth.UserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody RegisterRequest body) {
        User u = userService.register(body.username(), body.password(), body.displayName());
        return new UserResponse(u.getId(), u.getUsername(), u.getDisplayName(), u.getRole().name());
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) return ResponseEntity.status(401).build();
        User u = userService.byUsername(auth.getName());
        return ResponseEntity.ok(new UserResponse(u.getId(), u.getUsername(), u.getDisplayName(), u.getRole().name()));
    }
}
