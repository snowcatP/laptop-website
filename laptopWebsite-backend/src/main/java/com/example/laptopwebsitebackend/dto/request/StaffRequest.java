package com.example.laptopwebsitebackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StaffRequest {

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String address;

    private Double salary;

    private String password;

}
