package com.travel.service;

import com.travel.domain.User;
import com.travel.domain.UserRole;
import com.travel.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }

    @Transactional
    public User register(String username, String rawPassword, String displayName) {
        return register(username, rawPassword, displayName, UserRole.USER);
    }

    @Transactional
    public User register(String username, String rawPassword, String displayName, UserRole role) {
        if (repo.existsByUsername(username)) {
            throw new IllegalStateException("Username is already taken: " + username);
        }
        return repo.save(User.builder()
                .username(username)
                .passwordHash(encoder.encode(rawPassword))
                .displayName(displayName == null || displayName.isBlank() ? username : displayName.trim())
                .role(role)
                .createdAt(LocalDateTime.now())
                .build());
    }

    public User byUsername(String username) {
        return repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
