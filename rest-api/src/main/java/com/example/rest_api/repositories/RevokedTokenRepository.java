package com.example.rest_api.repositories;

import com.example.rest_api.models.RevokedToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RevokedTokenRepository extends MongoRepository<RevokedToken, String> {
}
