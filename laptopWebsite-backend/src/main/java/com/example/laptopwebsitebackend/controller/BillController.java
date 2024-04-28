package com.example.laptopwebsitebackend.controller;


import com.example.laptopwebsitebackend.entity.Bill;
import com.example.laptopwebsitebackend.entity.BillDetails;
import com.example.laptopwebsitebackend.service.BillDetailsService;
import com.example.laptopwebsitebackend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bill")
public class BillController {
    @Autowired
    private BillDetailsService billDetailsService;
    @Autowired
    private BillService billService;

    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills(){
        return new ResponseEntity<>(billService.getAllBills(), HttpStatus.OK) ;
    }
    @GetMapping("/bill-details/{id}")
    public ResponseEntity<BillDetails> getBillsDetails(@PathVariable("id") Long id){
        return new ResponseEntity<>(billDetailsService.getBillsDetails(id), HttpStatus.OK) ;
    }

}
