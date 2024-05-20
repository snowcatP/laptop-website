package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarrantyRepository extends JpaRepository<Warranty, Long> {
    List<Warranty> findWarrantiesByCustomer_CustomerId(Long customer_id);
}
