package com.example.laptopwebsitebackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String productName;

    private Double price;

    private int quantity;

    private String brand;

    private String category;

    private String image1;

    private String image2;

    private String image3;

    private String image4;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "configuration_id")
    private Configuration configuration;

    @ManyToOne
    @JoinColumn(name = "discount_id")
    private Discount discount;
}
