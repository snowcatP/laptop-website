package com.example.laptopwebsitebackend.dto.request;

import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class WarrantyRequest {

    private Date dateExpired;

    private Long productCode;

    private Date dateStart;

    private Long customer_id;

    private Long product_id;

}
