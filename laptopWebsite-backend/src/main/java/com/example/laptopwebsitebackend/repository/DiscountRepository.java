package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountRepository extends JpaRepository<Discount,Long> {
}
