package com.travel.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;
import java.util.Set;

@Controller
@RequiredArgsConstructor
public class LanguageController {

    private static final Set<String> SUPPORTED = Set.of("en", "ru", "kk");

    private final LocaleResolver localeResolver;

    @GetMapping("/lang/{locale}")
    public String change(@PathVariable String locale,
                         HttpServletRequest request,
                         HttpServletResponse response) {
        if (SUPPORTED.contains(locale)) {
            localeResolver.setLocale(request, response, Locale.forLanguageTag(locale));
        }
        String referer = request.getHeader("Referer");
        return "redirect:" + (referer != null && !referer.isBlank() ? referer : "/");
    }
}
