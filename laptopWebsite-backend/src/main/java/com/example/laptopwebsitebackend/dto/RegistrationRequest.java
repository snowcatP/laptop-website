package com.example.laptopwebsitebackend.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
}
