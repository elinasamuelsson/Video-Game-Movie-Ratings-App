package com.example.rest_api.repositories;

import com.example.rest_api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.UUID;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{_id:'?0'}")
    User getUserById(UUID id);
}
