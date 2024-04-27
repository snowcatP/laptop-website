package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Bill;
import com.example.laptopwebsitebackend.entity.Cart;
import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Order;
import com.example.laptopwebsitebackend.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.NoResultException;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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


    public Customer getMyProfile() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Customer myProfile = customerRepository.findByEmail(name)
                .orElseThrow(() -> new RuntimeException("User not exist"));

        return myProfile;
    }

    public Customer updateCustomer(Customer customer, Long customer_id){
        Customer dbcustomer = this.customerRepository.findById(customer_id).
                orElseThrow(() -> new RuntimeException("Could not find request"));

        return dbcustomer;
    }

    public String deleteCustomer(Long customer_id){
        if (!customerRepository.existsById(customer_id)) {
            throw new RuntimeException("Can't delete customer not exist");
        }

        customerRepository.deleteById(customer_id);
        return "Delete customer success";
    }
}
