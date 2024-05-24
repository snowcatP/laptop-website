package com.example.laptopwebsitebackend.entity;

import com.example.laptopwebsitebackend.service.EmailSenderService;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    @JsonBackReference
    private Cart cart;

    @OneToOne
    @JoinColumn(name = "account_id")
    @JsonBackReference
    private Account account;

    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL
    )
    @JsonBackReference
    private List<Bill> bills;



    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL
    )
    @JsonBackReference
    private List<Warranty> warranties;

}
