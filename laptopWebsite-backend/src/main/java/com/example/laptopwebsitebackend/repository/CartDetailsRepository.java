package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDetailsRepository extends JpaRepository<CartDetails,Long> {
    List<CartDetails> findAllByCartCartId(Long id);
}
