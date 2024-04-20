package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Boolean existsByEmail(String email);

    Optional<Customer> findByEmail(String email);
}
