package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigurationRepository extends JpaRepository<Configuration,Long> {
}
