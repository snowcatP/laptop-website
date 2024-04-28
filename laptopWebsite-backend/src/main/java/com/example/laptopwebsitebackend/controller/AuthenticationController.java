package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.AuthenticationRequest;
import com.example.laptopwebsitebackend.dto.request.IntrospectRequest;
import com.example.laptopwebsitebackend.dto.request.LogoutRequest;
import com.example.laptopwebsitebackend.dto.response.AuthenticationResponse;
import com.example.laptopwebsitebackend.dto.response.IntrospectResponse;
import com.example.laptopwebsitebackend.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) throws Exception {
        if (request == null || request.getUsername().isEmpty() || request.getPassword().isEmpty()){
            throw new RuntimeException("Wrong username or password");
        }

        AuthenticationResponse result = authenticationService.authenticate(request);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/introspect")
    public ResponseEntity<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws Exception {
        IntrospectResponse result = authenticationService.introspect(request);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody LogoutRequest request) throws Exception {
        authenticationService.logout(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
