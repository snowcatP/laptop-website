package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Bill;
import com.example.laptopwebsitebackend.entity.BillDetails;
import com.example.laptopwebsitebackend.repository.BillDetailsRepository;
import com.example.laptopwebsitebackend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillDetailsService {
    @Autowired
    private BillDetailsRepository billDetailsRepository;

    public BillDetails getBillsDetails(Long id) {
        return billDetailsRepository.findById(id).get();
    }
}
