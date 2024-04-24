package com.example.laptopwebsitebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private String productName;

    private Double price;

    private int quantity;

    private String category;

    private String brand;

    private int ram;

    private String processor;

    private Double screen;

    private int memory;

    private String graphicCard;

}
