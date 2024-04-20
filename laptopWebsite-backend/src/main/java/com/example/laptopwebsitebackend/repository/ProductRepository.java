package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    Boolean existsByProduct(String name);
}
