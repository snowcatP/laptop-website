package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.entity.Order;
import com.example.laptopwebsitebackend.service.OrderService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/change-address")
public class AddressController {
    @Autowired
    private OrderService orderService;
    @GetMapping
    public ResponseEntity<List<String>> getAddress(@PathVariable("orderId") Long orderId){
        return new ResponseEntity<>(orderService.findAddressByOrderId(orderId), HttpStatus.OK);
    }
    @PostMapping("/{orderId}/{address}")
    public ResponseEntity<Order> changeAddress(@PathVariable("orderId") Long orderId, @PathVariable("address") String address){
        Order order = orderService.findOrderById(orderId);
        order.setAddress(address);
        return new ResponseEntity<>(orderService.updateOrder(order), HttpStatus.OK);
    }
}
