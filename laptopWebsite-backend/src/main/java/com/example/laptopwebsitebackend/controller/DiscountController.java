package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.DiscountRequest;
import com.example.laptopwebsitebackend.dto.ProductRequest;
import com.example.laptopwebsitebackend.entity.Configuration;
import com.example.laptopwebsitebackend.entity.Discount;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.service.DiscountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discount")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @PostMapping
    public ResponseEntity<Discount> create_New_Discount(@Valid @RequestBody DiscountRequest discountRequest){

        Discount discount = new Discount();
        discount.setDiscountValue(discountRequest.getDiscountValue());
        discount.setStartDate(discountRequest.getStartDate());
        discount.setEndDate(discountRequest.getEndDate());

        discountService.addNewDiscount(discount);

        return new ResponseEntity<>(discount, HttpStatus.OK  );
    }

    @GetMapping
    public ResponseEntity<List<Discount>> get_All_Discounts(){
        List<Discount> allDiscounts = discountService.getListAllDiscounts();

        return new ResponseEntity<>(allDiscounts, HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Discount> get_Discount_By_Id(@PathVariable("id") Long discount_Id) {
        Discount discount = discountService.findDiscountById(discount_Id);

        return new ResponseEntity<>(discount, HttpStatus.OK);
    }

    @PutMapping(value = "/edit/{id}")
    public void update_Discount( @PathVariable(name = "id") Long id,@RequestBody DiscountRequest discountRequest) {

        Discount discount = new Discount();
        discount.setDiscountValue(discountRequest.getDiscountValue());
        discount.setStartDate(discountRequest.getStartDate());
        discount.setEndDate(discountRequest.getEndDate());

        discountService.updateDiscount(discount,id);

    }

    @DeleteMapping("/delete/{id}")
    public void delete_Discount(@PathVariable("id") Long id) {
        discountService.deleteDiscount(id);
    }
}
