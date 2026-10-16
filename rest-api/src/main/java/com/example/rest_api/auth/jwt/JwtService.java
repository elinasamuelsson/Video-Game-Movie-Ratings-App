package com.example.rest_api.auth.jwt;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class JwtService {
    private static final Algorithm ALGORITHM = Algorithm.HMAC256(System.getenv("JWT_SECRET"));

    private static final JWTVerifier verifier = JWT
            .require(ALGORITHM)
            .withIssuer("vgml").build();

    public String generateToken(UUID userId) {
        return JWT
                .create()
                .withIssuer("vgml")
                .withIssuedAt(Instant.now())
                .withExpiresAt(Instant.now().plus(1, ChronoUnit.DAYS))
                .withSubject(userId.toString())
                .withJWTId(UUID.randomUUID().toString())
                .sign(ALGORITHM);
    }

    public DecodedJWT verifyToken(String token) {
        return verifier.verify(token);
    }

    public UUID validateToken(String token) {
        return UUID.fromString(verifyToken(token).getSubject());
    }
}
