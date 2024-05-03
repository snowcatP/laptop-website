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


    public Order getOrder(Long orderId) {
        return orderRepository.findById(orderId).get();
    }

    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }


    public List<String> findAddressByOrderId(Long orderId) {
            return orderRepository.findAddressByOrderId(orderId);
    }

    public Order findOrderById(Long orderId) {
        return orderRepository.findById(orderId).get();
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrderByCustomer(Long customerId) {
        return orderRepository.findByCustomerCustomerId(customerId);

    }
}
