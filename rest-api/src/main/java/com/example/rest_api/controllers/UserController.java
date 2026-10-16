package com.example.rest_api.controllers;

import com.example.rest_api.models.User;
import com.example.rest_api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> response = userService.getAllUsers();
        return ResponseEntity.ok().body(response);
    }
}
