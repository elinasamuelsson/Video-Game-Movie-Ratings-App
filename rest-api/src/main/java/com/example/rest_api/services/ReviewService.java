package com.example.rest_api.services;

import com.example.rest_api.dtos.requests.ReviewRequest;
import com.example.rest_api.models.Review;
import com.example.rest_api.models.User;
import com.example.rest_api.repositories.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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

    public void createReview(ReviewRequest request, Authentication authentication) {
        UUID movieId = UUID.fromString(request.movieId());
        User user = (User) authentication.getPrincipal();

        Review review = new Review(movieId, user.getId(), request.title(), request.content(), request.rating());

        reviewRepository.save(review);
    }

    public void deleteReview(UUID reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
