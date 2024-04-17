package com.example.laptopwebsitebackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Configuration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long configurationId;

    private int ram;

    private String processor;

    private Double screen;

    private int memory;

    private String graphicCard;

    @OneToOne(
            mappedBy = "configuration"
    )
    private Product product;
}
