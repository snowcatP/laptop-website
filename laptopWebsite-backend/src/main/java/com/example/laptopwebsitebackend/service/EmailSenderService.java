package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Observer;
import com.example.laptopwebsitebackend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailSenderService implements Observer{

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private CustomerRepository customerRepository;

    @Value("${email.sender}")
    private String sender;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    @Override
    public void notifyUpdate(String message) {
        List<Customer> customers = customerRepository.findAll();
        for (Customer customer : customers) {
            sendEmail(customer.getEmail(), "Electro - New discount available", message);
        }
    }
}
