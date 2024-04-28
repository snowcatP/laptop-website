package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Cart;
import com.example.laptopwebsitebackend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public Cart findCartById(Long cartId) {
        return cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart is not exist with given id: " + cartId));
    }
}
