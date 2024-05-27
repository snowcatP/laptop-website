package com.example.laptopwebsitebackend.state;

import com.example.laptopwebsitebackend.entity.Order;

public class ConfirmedState implements OrderState{
    @Override
    public void next(Order order) {
        order.setState(new ShippedState());

    }



    @Override
    public String getStatus() {
        return "Confirmed";
    }
}