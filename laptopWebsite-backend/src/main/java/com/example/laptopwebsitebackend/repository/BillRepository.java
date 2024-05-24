package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByCustomerCustomerId(Long customerId);
}
