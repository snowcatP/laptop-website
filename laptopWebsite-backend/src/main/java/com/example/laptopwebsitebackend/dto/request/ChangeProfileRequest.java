package com.example.laptopwebsitebackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ChangeProfileRequest {
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
}
