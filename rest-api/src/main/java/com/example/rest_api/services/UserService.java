package com.example.rest_api.services;

import com.example.rest_api.dtos.requests.UpdateUserRequest;
import com.example.rest_api.dtos.responses.MeResponse;
import com.example.rest_api.dtos.responses.UserResponse;
import com.example.rest_api.models.User;
import com.example.rest_api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public MeResponse getMe(String name) {
        Optional<User> optUser = userRepository.getUserByUsername(name);
        User user = optUser.get();
        return new MeResponse(user.getId(), user.getUsername());
    }

    public UserResponse getUser(UUID id) {
        User user = userRepository.getUserById(id);
        return new UserResponse(user.getUsername(), user.getBio(), user.getProfileImage(), user.getCreatedAt());
    }

    public void updateMe(UUID userId, UpdateUserRequest request) {
        User user = userRepository.getUserById(userId);

        if (request.bio() != null) {
            user.setBio(request.bio());
        }

        userRepository.save(user);
    }
}
