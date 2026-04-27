package com.travel.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.multipart.support.MultipartFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/", "/cars", "/cars/*", "/cars/*/image",
                                "/apartments", "/apartments/*", "/apartments/*/image",
                                "/combo",
                                "/api/markers/**",
                                "/lang/**",
                                "/login", "/register",
                                "/css/**", "/js/**", "/images/**", "/favicon.ico",
                                "/error"
                        ).permitAll()
                        .requestMatchers("/admin", "/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/cars/*/book", "/apartments/*/book", "/combo/book").authenticated()
                        .requestMatchers("/bookings", "/bookings/**").authenticated()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/", false)
                        .failureUrl("/login?error")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                )
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Register MultipartFilter BEFORE the Spring Security filter chain so that
     * multipart bodies are parsed in time for CsrfFilter to read `_csrf` form param.
     */
    @Bean
    public FilterRegistrationBean<MultipartFilter> multipartFilterRegistration() {
        FilterRegistrationBean<MultipartFilter> reg = new FilterRegistrationBean<>(new MultipartFilter());
        reg.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return reg;
    }
}
