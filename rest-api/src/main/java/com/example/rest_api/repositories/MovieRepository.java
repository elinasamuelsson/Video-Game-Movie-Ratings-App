package com.example.rest_api.repositories;

import com.example.rest_api.models.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface MovieRepository extends MongoRepository<Movie, UUID> {
    Movie getMovieById(UUID id);
}
