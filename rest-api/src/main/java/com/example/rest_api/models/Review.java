package com.example.rest_api.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@NoArgsConstructor
@Getter
@Setter
@Document("reviews")
public class Review {
    @Id
    private UUID id;

    private UUID movieId;
    private UUID userId;
    private String title;
    private String content;
    private int rating;

    public  Review(UUID movieId, UUID userId, String title, String content, int rating) {
        this.id = UUID.randomUUID();
        this.movieId = movieId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.rating = rating;
    }
}