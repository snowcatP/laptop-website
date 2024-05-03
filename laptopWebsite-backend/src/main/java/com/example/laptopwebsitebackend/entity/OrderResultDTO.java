package com.example.laptopwebsitebackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResultDTO {
    @Id
    private Long orderId;
    private String totalPrice;

    private String state;

    private String address;

    private Date deliveredDate;

    private String payment;
    private List<OrderDetails> orderDetails;




}
