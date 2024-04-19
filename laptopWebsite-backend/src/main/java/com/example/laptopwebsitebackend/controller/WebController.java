package com.example.laptopwebsitebackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {

    @GetMapping
    public String hello() {
        return "This is main page.";
    }

    @GetMapping("/cart")
    public String cart() {
        return "This is cart page.";
    }



    @GetMapping("/loginGet")
    public String login() {
        return "This is login page GET.";
    }

    @PostMapping("/loginPost")
    public String sendLogin() {
        return "This is login page POST.";
    }
}
