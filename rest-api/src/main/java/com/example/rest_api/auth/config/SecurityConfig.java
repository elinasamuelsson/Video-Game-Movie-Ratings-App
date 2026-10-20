package com.example.rest_api.auth.config;

import com.example.rest_api.auth.jwt.JwtAuthFilter;
import com.example.rest_api.auth.jwt.JwtService;
import com.example.rest_api.repositories.RevokedTokenRepository;
import com.example.rest_api.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain apiFilterChain(HttpSecurity http,
                                              UserRepository userRepository,
                                              RevokedTokenRepository revokedTokenRepository,
                                              JwtService jwtService) {
        http
                .securityMatcher("/api/**")
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/movies/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/reviews/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/reviews").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/reviews").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/auth/logout").authenticated()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthFilter(userRepository, revokedTokenRepository, jwtService),
                        UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
