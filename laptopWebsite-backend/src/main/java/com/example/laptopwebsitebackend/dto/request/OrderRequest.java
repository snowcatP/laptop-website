package com.example.laptopwebsitebackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Long customerId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String address;

    private Long paymentId;

    private List<Long> lstCartDetailsId;
}