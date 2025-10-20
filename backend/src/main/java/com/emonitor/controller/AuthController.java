package com.emonitor.controller;

import com.emonitor.model.User;
import com.emonitor.service.AuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody Map<String,String> req){
        String email = req.get("email");
        String password = req.get("password");
        return authService.login(email, password).map(user -> {
            String token = Jwts.builder()
                    .claim("userId", user.getId())
                    .claim("role", user.getRole())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration))
                    .signWith(SignatureAlgorithm.HS256, secret)
                    .compact();
            return Map.of("token", token, "user", user);
        }).orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody Map<String,String> req){
        String email = req.get("email");
        String token = authService.generateResetToken(email);
        if(token != null){
            return "Reset Token Generated: " + token;
        }
        return "Email not found";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String,String> req){
        String token = req.get("token");
        String newPassword = req.get("password");
        boolean success = authService.resetPassword(token,newPassword);
        return success ? "Password reset successfully" : "Invalid token";
    }
}
