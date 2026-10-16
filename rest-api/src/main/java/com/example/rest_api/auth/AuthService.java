package com.example.rest_api.auth;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.rest_api.auth.config.PasswordConfig;
import com.example.rest_api.auth.jwt.JwtService;
import com.example.rest_api.dtos.requests.AuthRequest;
import com.example.rest_api.exceptions.UserException;
import com.example.rest_api.models.RevokedToken;
import com.example.rest_api.models.User;
import com.example.rest_api.repositories.RevokedTokenRepository;
import com.example.rest_api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RevokedTokenRepository revokedTokenRepository;
    private final JwtService jwtService;
    private final PasswordConfig passwordConfig;

    public User registerUser(AuthRequest request) {
        if (request.username() == null || request.username().isEmpty()) {
            throw new UserException("Username cannot be empty.");
        }

        if (request.username().length() < 5 || request.username().length() > 33) {
            throw new UserException("Username must be between 6 and 32 characters");
        }

        if (request.password() ==  null || request.password().isEmpty()) {
            throw new UserException("Password cannot be empty.");
        }

        if  (request.password().length() < 5 || request.password().length() > 33) {
            throw new UserException("Password must be between 6 and 32 characters");
        }

        if (!request.password().matches(".*[0-9].*") ||
                !request.password().matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
            throw new UserException("Password must contain at least one number and one special character.");
        }

        if (userRepository.getUserByUsername(request.username()).isPresent()) {
            throw new UserException("Username already exists.");
        }

        return userRepository.save(new User(
                request.username(),
                passwordConfig.passwordEncoder().encode(request.password())
                )
        );
    }

    public String loginUser(AuthRequest request) throws Exception {
        if (request.username() == null || request.username().isEmpty() || request.password() == null || request.password().isEmpty()) {
            throw new BadCredentialsException("Invalid username or password.");
        }

        User user = userRepository.getUserByUsername(request.username()).get();

        if (user == null) {
            throw new BadCredentialsException("Invalid username or password.");
        }

        if (!passwordConfig.passwordEncoder().matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid username or password.");
        }

        String token = jwtService.generateToken(user.getId());

        return token;
    }

    public Void logoutUser(String header) {
        DecodedJWT decoded = jwtService.verifyToken(header.substring(7));
        revokedTokenRepository.save(new RevokedToken(decoded.getId(), decoded.getExpiresAtAsInstant()));
        return null;
    }
}
