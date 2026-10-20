package com.example.rest_api.controllers;

import com.example.rest_api.models.Review;
import com.example.rest_api.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<Review>> getAllReviewsForMovie(@RequestBody UUID movieId) {
        List<Review> response = reviewService.getAllReviewsForMovie(movieId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Review>> getAllReviewsForUser(@RequestBody UUID userId) {
        List<Review> response = reviewService.getAllReviewsForUser(userId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.createReview(review));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteReview(@RequestBody UUID reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().build();
    }
}

