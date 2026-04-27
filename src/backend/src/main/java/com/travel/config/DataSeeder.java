package com.travel.config;

import com.travel.domain.UserRole;
import com.travel.repo.UserRepository;
import com.travel.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public void run(ApplicationArguments args) {
        if (!userRepository.existsByUsername("admin")) {
            userService.register("admin", "admin1234", "Site Admin", UserRole.ADMIN);
            log.info("Seeded admin user (admin / admin1234)");
        }
    }
}
