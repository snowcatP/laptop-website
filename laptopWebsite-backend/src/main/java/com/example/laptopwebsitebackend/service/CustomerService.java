package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Bill;
import com.example.laptopwebsitebackend.entity.Cart;
import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Order;
import com.example.laptopwebsitebackend.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.NoResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer createNewCustomer(Customer customer) {
        if (customerRepository.existsByEmail(customer.getEmail())){
            throw new RuntimeException("User email has existed");
        }
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer findCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee is not exist with given id: " + id));

        return customer;
    }
}
