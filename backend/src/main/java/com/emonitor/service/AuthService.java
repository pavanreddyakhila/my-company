package com.emonitor.service;

import com.emonitor.model.User;
import com.emonitor.repository.UserRepository;
import com.emonitor.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())){
            throw new BadRequestException("Invalid email or password");
        }
        return userOpt;
    }

    public String generateResetToken(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isPresent()){
            String token = UUID.randomUUID().toString();
            User user = userOpt.get();
            user.setResetToken(token);
            userRepository.save(user);
            return token;
        }
        return null;
    }

    public boolean resetPassword(String token, String newPassword) {
        Optional<User> userOpt = userRepository.findByResetToken(token);
        if(userOpt.isPresent()){
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
