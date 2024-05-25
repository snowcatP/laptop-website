package com.example.laptopwebsitebackend.state;

import com.example.laptopwebsitebackend.entity.Order;

public class ShippedState implements OrderState{
    @Override
    public void next(Order order) {
        order.setState(new DeliveredState());
    }


    @Override
    public String getStatus() {
        return "Shipped";
    }
}
