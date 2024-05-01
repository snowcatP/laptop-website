package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.CustomerRequest;
import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Slf4j
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<Customer> createNewUser(@RequestBody Customer customer){

        Customer newCustomer = customerService.createNewCustomer(customer);

        return new ResponseEntity<>(newCustomer, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers(){

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        List<Customer> allCustomers = customerService.getAllCustomers();

        return new ResponseEntity<>(allCustomers, HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Customer> getUserById(@PathVariable("id") Long customerId) {
        Customer customer = customerService.findCustomerById(customerId);

        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Customer> getMyProfile() {
        return new ResponseEntity<>(customerService.getMyProfile(), HttpStatus.OK);
    }
    @PutMapping(value = "/edit/{id}")
    public void update_Customer( @PathVariable(name = "id") Long id,@RequestBody CustomerRequest customerRequest) {

        Customer customer= new Customer();
        customer.setFirstName(customerRequest.getFirstName());
        customer.setLastName(customerRequest.getLastName());
        customer.setEmail(customerRequest.getEmail());
        customer.setAddress(customerRequest.getAddress());
        customer.setPhone(customerRequest.getPhone());
        customerService.updateCustomer(customer, id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete_Customer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(customerService.deleteCustomer(id));
    }
}
