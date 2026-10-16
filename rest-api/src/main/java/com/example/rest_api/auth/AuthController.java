package com.example.rest_api.auth;

import com.example.rest_api.dtos.requests.AuthRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody AuthRequest request) {
        authService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/session")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) throws Exception {
        return ResponseEntity.ok(authService.loginUser(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String header) throws Exception {
        authService.logoutUser(header);
        return ResponseEntity.noContent().build();
    }
}
