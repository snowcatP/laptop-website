package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Observer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService implements Observer {

    @Autowired
    private JavaMailSender mailSender;

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
    public void update(String to, String subject, String body) {
        sendEmail(to, subject, body);
    }
}
