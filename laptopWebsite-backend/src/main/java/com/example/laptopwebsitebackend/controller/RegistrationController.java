package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.RegistrationRequest;
import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.entity.Cart;
import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.service.AccountService;
import com.example.laptopwebsitebackend.service.CustomerService;
import com.example.laptopwebsitebackend.util.PasswordEncoderSingleton;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class RegistrationController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private CustomerService customerService;

    private static final PasswordEncoder passwordEncoder = PasswordEncoderSingleton.getEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> customerRegister(@RequestBody @Valid RegistrationRequest registrationRequest) {

        Account newAccount = new Account();
        newAccount.setUsername(registrationRequest.getEmail());
        newAccount.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

        Customer newCustomer = new Customer();
        newCustomer.setFirstName(registrationRequest.getFirstName());
        newCustomer.setLastName(registrationRequest.getLastName());
        newCustomer.setAddress(registrationRequest.getAddress());
        newCustomer.setEmail(registrationRequest.getEmail());
        newCustomer.setPhone(registrationRequest.getPhone());
        newCustomer.setCart(new Cart());

        Account savedAccount = accountService.createNewAccount(newAccount, "USER");
        newCustomer.setAccount(savedAccount);

        customerService.createNewCustomer(newCustomer);

        return new ResponseEntity<>(newCustomer, HttpStatus.OK);
    }
}
