package com.example.rest_api.services;

import com.example.rest_api.models.Movie;
import com.example.rest_api.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(UUID movieId) {
        return movieRepository.getMovieById(movieId);
    }
}
