package com.example.laptopwebsitebackend.state;

import com.example.laptopwebsitebackend.entity.Order;

public class PendingState implements OrderState{
    @Override
    public void next(Order order) {
        order.setState(new ConfirmedState());
    }

    @Override
    public void prev(Order order) {

    }

    @Override
    public String getStatus() {
        return "Pending";
    }
}
