package com.example.laptopwebsitebackend.entity;

public interface OrderState {
    void next(Order order);
    void prev(Order order);
    String getStatus();
}
