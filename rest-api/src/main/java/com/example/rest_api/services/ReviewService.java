package com.example.rest_api.services;

import com.example.rest_api.models.Review;
import com.example.rest_api.repositories.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public List<Review> getAllReviewsForMovie(UUID movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    public List<Review> getAllReviewsForUser(UUID userId) {
        return reviewRepository.findByUserId(userId);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(UUID reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
