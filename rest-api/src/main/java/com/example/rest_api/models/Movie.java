package com.example.rest_api.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

@NoArgsConstructor
@Getter
@Setter
@Document("movies")
public class Movie {
    @Id
    private UUID id;

    private String title;
    private String plot;
    private String posterImage;
    private ArrayList<String> genres;
    private ArrayList<String> directors;
    private ArrayList<String> writers;
    private ArrayList<String> actors;
    private int runtimeSeconds;
    private Date releaseDate;
}
