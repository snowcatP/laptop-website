package com.example.laptopwebsitebackend.state;

import com.example.laptopwebsitebackend.entity.Order;

public class CancelledState implements OrderState{
    @Override
    public void next(Order order) {

    }

    @Override
    public void prev(Order order) {
        order.setState(new PendingState());

    }

    @Override
    public String getStatus() {
        return "Cancelled";
    }
}
