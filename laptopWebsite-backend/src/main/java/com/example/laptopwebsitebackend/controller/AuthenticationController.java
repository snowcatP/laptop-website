package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.AuthenticationRequest;
import com.example.laptopwebsitebackend.dto.request.IntrospectRequest;
import com.example.laptopwebsitebackend.dto.response.AuthenticationResponse;
import com.example.laptopwebsitebackend.dto.response.IntrospectResponse;
import com.example.laptopwebsitebackend.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/token")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) throws Exception {
        AuthenticationResponse result = authenticationService.authenticate(request);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/introspect")
    public ResponseEntity<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws Exception {
        IntrospectResponse result = authenticationService.introspect(request);

        return ResponseEntity.ok(result);
    }
}
