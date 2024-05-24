package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.BillDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailsRepository extends JpaRepository<BillDetails, Long> {
}
