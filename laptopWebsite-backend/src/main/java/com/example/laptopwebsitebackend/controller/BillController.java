package com.example.laptopwebsitebackend.controller;


import com.example.laptopwebsitebackend.entity.Bill;
import com.example.laptopwebsitebackend.entity.BillDetails;
import com.example.laptopwebsitebackend.service.BillDetailsService;
import com.example.laptopwebsitebackend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bill")
@CrossOrigin()
public class BillController {
    @Autowired
    private BillDetailsService billDetailsService;
    @Autowired
    private BillService billService;

    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills(){
        return new ResponseEntity<>(billService.getAllBills(), HttpStatus.OK) ;
    }
    @GetMapping("/bills-of-customer/{customerId}")
    public ResponseEntity<List<Bill>> getBillsDetails(@PathVariable("customerId") Long customerId){
        return new ResponseEntity<>(billService.getBillsDetailsByCustomerId(customerId), HttpStatus.OK) ;
    }


}
