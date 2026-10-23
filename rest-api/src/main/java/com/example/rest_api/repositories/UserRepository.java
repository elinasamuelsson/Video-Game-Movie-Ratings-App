package com.example.rest_api.repositories;

import com.example.rest_api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends MongoRepository<User, UUID> {
    Optional<User> getUserByUsername(String username);
    User getUserById(UUID id);
}
