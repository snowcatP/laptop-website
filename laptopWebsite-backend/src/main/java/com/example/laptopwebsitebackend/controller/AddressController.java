package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.entity.Order;
import com.example.laptopwebsitebackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/change-address/{orderId}")
public class AddressController {
    @Autowired
    private OrderService orderService;
//    @GetMapping
//    public ResponseEntity<String> getAddress(@PathVariable("orderId") Long orderId){
//        Order order = orderService.getOrder(orderId);
//
//    }
}
