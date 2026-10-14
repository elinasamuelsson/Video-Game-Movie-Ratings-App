package com.example.rest_api.services;

import com.example.rest_api.models.User;
import com.example.rest_api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(new User(user.getUsername(), user.getPasswordHash()));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
