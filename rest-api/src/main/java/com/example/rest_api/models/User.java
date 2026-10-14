package com.example.rest_api.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;

@NoArgsConstructor
@Getter
@Setter
@Document("users")
public class User {
    @Id
    private UUID id;

    private String username;
    private String passwordHash;
    private String bio;
    private String profileImage;
    private Date createdAt;

    public User(String username, String passwordHash) {
        this.id = UUID.randomUUID();
        this.username = username;
        this.passwordHash = passwordHash;
        this.bio = "";
        this.profileImage = "";
        this.createdAt = new Date();
    }
}
