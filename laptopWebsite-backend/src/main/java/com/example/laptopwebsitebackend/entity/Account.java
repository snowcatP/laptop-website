package com.example.laptopwebsitebackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    private String username;

    private String password;

    @ManyToOne
    @JoinColumn(name = "permission_id")
    private Permission permission;

    @OneToOne(
            mappedBy = "account",
            cascade = CascadeType.ALL
    )
    private Staff staff;

    @OneToOne(
            mappedBy = "account",
            cascade = CascadeType.ALL
    )
    private Customer customer;
}
