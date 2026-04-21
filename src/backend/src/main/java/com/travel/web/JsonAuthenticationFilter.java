package com.travel.web;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;
import com.travel.web.dto.auth.LoginRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class JsonAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper mapper = JsonMapper.builder().build();

    public JsonAuthenticationFilter() {
        setFilterProcessesUrl("/api/auth/login");
        setUsernameParameter("username");
        setPasswordParameter("password");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        if (request.getContentType() == null
                || !request.getContentType().toLowerCase().startsWith("application/json")) {
            return super.attemptAuthentication(request, response);
        }
        try {
            LoginRequest body = mapper.readValue(request.getInputStream(), LoginRequest.class);
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(body.username(), body.password());
            setDetails(request, token);
            return getAuthenticationManager().authenticate(token);
        } catch (IOException e) {
            throw new AuthenticationServiceException("Malformed JSON login payload", e);
        }
    }
}
