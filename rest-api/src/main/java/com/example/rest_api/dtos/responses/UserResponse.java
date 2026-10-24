package com.example.rest_api.dtos.responses;

import java.util.Date;

public record UserResponse(String username, String bio, String profileImage, Date createdAt) {
}
