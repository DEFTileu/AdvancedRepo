package com.travel.web;

import com.travel.service.UserService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final UserService userService;

    @GetMapping("/login")
    public String login(@RequestParam(required = false) String error,
                        @RequestParam(required = false) String logout,
                        @RequestParam(required = false) String registered,
                        Model model) {
        model.addAttribute("error", error);
        model.addAttribute("logout", logout);
        model.addAttribute("registered", registered);
        return "auth/login";
    }

    @GetMapping("/register")
    public String registerForm() {
        return "auth/register";
    }

    @PostMapping("/register")
    public String register(@RequestParam @NotBlank @Size(min = 3, max = 32) String username,
                           @RequestParam @NotBlank @Size(min = 6, max = 100) String password,
                           @RequestParam(required = false) String displayName,
                           RedirectAttributes ra) {
        try {
            userService.register(username.trim(), password, displayName);
        } catch (IllegalStateException ex) {
            ra.addFlashAttribute("registerError", ex.getMessage());
            return "redirect:/register";
        }
        return "redirect:/login?registered";
    }
}
