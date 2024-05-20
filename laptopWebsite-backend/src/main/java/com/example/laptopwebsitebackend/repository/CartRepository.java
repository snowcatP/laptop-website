package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Cart;
import com.example.laptopwebsitebackend.entity.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<CartDetails> findAllCartDetailsByCartId(Long id);
}
