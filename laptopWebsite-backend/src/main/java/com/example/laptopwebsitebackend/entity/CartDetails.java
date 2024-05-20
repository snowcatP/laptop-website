package com.example.laptopwebsitebackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartDetailsId;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Double Price;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonBackReference
    private Cart cart;
}
