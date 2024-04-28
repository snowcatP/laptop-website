package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Order;
import com.example.laptopwebsitebackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
