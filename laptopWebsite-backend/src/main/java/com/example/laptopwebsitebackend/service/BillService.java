package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Bill;
import com.example.laptopwebsitebackend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {
    @Autowired
    private BillRepository billRepository;

    public List<Bill> getAllBills() {
       return billRepository.findAll();
    }
}
