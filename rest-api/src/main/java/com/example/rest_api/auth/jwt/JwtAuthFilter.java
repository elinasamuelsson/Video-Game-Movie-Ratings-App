package com.example.rest_api.auth.jwt;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.rest_api.models.User;
import com.example.rest_api.repositories.RevokedTokenRepository;
import com.example.rest_api.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserRepository userRepository;
    private final RevokedTokenRepository revokedTokenRepository;
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header == null || header.isBlank() || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring("Bearer ".length());

        DecodedJWT decoded;
        try {
            decoded = jwtService.verifyToken(token);
        } catch (JWTVerificationException exception) {
            response.setStatus(401);
            return;
        }

        String jti = decoded.getId();
        if (jti == null || revokedTokenRepository.existsById(jti)) {
            response.setStatus(401);
            return;
        }

        UUID userId = UUID.fromString(decoded.getSubject());
        Optional<User> optUser = userRepository.findById(userId);

        if (optUser.isEmpty()) {
            response.setStatus(401);
            return;
        }

        User user = optUser.get();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                user,
                null,
                user.getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}