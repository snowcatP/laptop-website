package com.example.laptopwebsitebackend.state;

import com.example.laptopwebsitebackend.entity.Order;

public interface OrderState {
    void next(Order order);
    void prev(Order order);
    String getStatus();
}
