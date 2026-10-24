package com.example.rest_api.controllers;

import com.example.rest_api.models.Movie;
import com.example.rest_api.services.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {
    public final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> response = movieService.getAllMovies();
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/movie")
    public ResponseEntity<Movie> getMovieById(@RequestParam UUID movieId) {
        Movie response = movieService.getMovieById(movieId);
        System.out.println(response.toString());
        return ResponseEntity.ok().body(response);
    }
}
