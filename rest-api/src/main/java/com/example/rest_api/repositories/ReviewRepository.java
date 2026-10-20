package com.example.rest_api.repositories;

import com.example.rest_api.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends MongoRepository<Review, UUID> {
    List<Review> findByMovieId(UUID movieId);
    List<Review> findByUserId(UUID userId);

}

