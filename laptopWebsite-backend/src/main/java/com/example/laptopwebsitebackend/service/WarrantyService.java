package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.dto.request.CustomerRequest;
import com.example.laptopwebsitebackend.entity.Configuration;
import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Warranty;
import com.example.laptopwebsitebackend.repository.WarrantyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class WarrantyService {

    @Autowired
    private WarrantyRepository warrantyRepository;

    @Autowired
    private CustomerService customerService;

    public List<Warranty> getListAllWarranty(){

        return warrantyRepository.findAll();
    }

    public Warranty addNewWarranty(Warranty warranty){

        if(warranty.getDateStart() != null && warranty.getDateExpired() != null &&
                warranty.getDateStart().after(warranty.getDateExpired())) {
            throw new IllegalArgumentException("Start date must be before end date");
        }
        return warrantyRepository.save(warranty);
    }

    public void deleteWarranty(Long warranty_id){
        warrantyRepository.deleteById(warranty_id);
    }

    public Warranty updateWarranty(Warranty warranty, Long warranty_id){
        Warranty dbWarranty = this.warrantyRepository.findById(warranty_id).
                orElseThrow(() -> new RuntimeException("Could not find request"));

        if(warranty.getProductCode() != null && !Objects.equals(dbWarranty.getProductCode(),warranty.getProductCode())){
            dbWarranty.setProductCode(warranty.getProductCode());
        }

        if(warranty.getDateStart() != null && warranty.getDateExpired() != null &&
                warranty.getDateStart().after(warranty.getDateExpired())) {
            throw new IllegalArgumentException("Start date must be before end date");
        }

        if(warranty.getDateStart() != null && !Objects.equals(dbWarranty.getDateStart(),warranty.getDateStart())){
            dbWarranty.setDateStart(warranty.getDateStart());
        }

        if(warranty.getDateExpired() != null && !Objects.equals(dbWarranty.getDateExpired(),warranty.getDateExpired())){
            dbWarranty.setDateExpired(warranty.getDateExpired());
        }

        return warrantyRepository.save(dbWarranty);
    }

    public Warranty findWarranty(Long warranty_id){
        Warranty warranty = warrantyRepository.findById(warranty_id)
                .orElseThrow(() -> new RuntimeException("Warranty is not exist with given id: " + warranty_id));

        return warranty;
    }

    public List<Warranty> findWarrantyByCustomerId (Long customer_id){
        return warrantyRepository.findWarrantiesByCustomer_CustomerId(customer_id);
    }

}
