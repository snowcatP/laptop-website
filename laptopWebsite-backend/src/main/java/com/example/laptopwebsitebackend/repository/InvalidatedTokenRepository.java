package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {
}
