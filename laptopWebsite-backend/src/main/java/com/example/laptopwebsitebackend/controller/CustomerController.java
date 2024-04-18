package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    private ResponseEntity<Customer> createNewUser(@RequestBody Customer customer){

        Customer newCustomer = customerService.createCustomer(customer);

        return new ResponseEntity<>(newCustomer, HttpStatus.OK);
    }

    @GetMapping
    private ResponseEntity<List<Customer>> getAllCustomers(){
        List<Customer> allCustomers = customerService.getAllCustomers();

        return new ResponseEntity<>(allCustomers, HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    private ResponseEntity<Customer> getUserById(@PathVariable("id") Long customerId) {
        Customer customer = customerService.findCustomerById(customerId);

        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
}
