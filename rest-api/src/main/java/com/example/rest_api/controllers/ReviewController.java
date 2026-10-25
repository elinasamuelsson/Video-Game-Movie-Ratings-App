package com.example.rest_api.controllers;

import com.example.rest_api.dtos.requests.ReviewRequest;
import com.example.rest_api.models.Review;
import com.example.rest_api.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    public final ReviewService reviewService;

    @GetMapping("/movie")
    public ResponseEntity<List<Review>> getAllReviewsForMovie(@RequestParam UUID movieId) {
        List<Review> response = reviewService.getAllReviewsForMovie(movieId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Review>> getAllReviewsForUser(@RequestParam UUID userId) {
        List<Review> response = reviewService.getAllReviewsForUser(userId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<Void> createReview(@RequestBody ReviewRequest request, Authentication authentication) {
        reviewService.createReview(request, authentication);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable UUID reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().build();
    }
}

