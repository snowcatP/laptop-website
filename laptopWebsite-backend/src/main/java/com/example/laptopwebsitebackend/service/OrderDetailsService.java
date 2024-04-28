package com.example.laptopwebsitebackend.service;


import com.example.laptopwebsitebackend.entity.OrderDetails;
import com.example.laptopwebsitebackend.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailsService {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    public List<OrderDetails> findOrderDetailsByOrderId(Long orderId) {
        return orderDetailsRepository.findAllByOrderOrderId(orderId);

    }

    public OrderDetails findById(Long orderDetailsId) {
        return orderDetailsRepository.findById(orderDetailsId).get();
    }

    public OrderDetails updateOrderDetails(OrderDetails orderDetails) {
        return orderDetailsRepository.save(orderDetails);
    }

    public String deleteById(Long cartDetailsId) {
        if (!orderDetailsRepository.existsById(cartDetailsId)){
            throw new RuntimeException("Can't delete order that does not exist");
        }
        return "Delete order successfully";
    }
}
