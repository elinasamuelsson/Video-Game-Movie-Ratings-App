package com.example.rest_api.dtos.requests;

public record ReviewRequest(String movieId, String title, String content, Integer rating) {
}
