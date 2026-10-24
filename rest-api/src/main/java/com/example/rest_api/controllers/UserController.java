package com.example.rest_api.controllers;

import com.example.rest_api.dtos.requests.UpdateUserRequest;
import com.example.rest_api.dtos.responses.MeResponse;
import com.example.rest_api.dtos.responses.UserResponse;
import com.example.rest_api.models.User;
import com.example.rest_api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> response = userService.getAllUsers();
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUser(@RequestParam UUID userId) {
        UserResponse response = userService.getUser(userId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<MeResponse> getMe(Authentication authentication) {
        MeResponse response = userService.getMe(authentication.getName());
        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/me")
    public ResponseEntity<Void> updateMe(Authentication authentication, @RequestBody UpdateUserRequest request) {
        User user = (User) authentication.getPrincipal();
        userService.updateMe(user.getId(), request);
        return ResponseEntity.ok().build();
    }
}
