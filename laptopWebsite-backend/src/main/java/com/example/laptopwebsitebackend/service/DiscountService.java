package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Configuration;
import com.example.laptopwebsitebackend.entity.Discount;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.repository.DiscountRepository;
import com.example.laptopwebsitebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Discount> getListAllDiscounts(){
        return discountRepository.findAll();
    }
    public Discount addNewDiscount(Discount discount){
        // Check if start date is before end date
        if(discount.getStartDate() != null && discount.getEndDate() != null &&
                discount.getStartDate().after(discount.getEndDate())) {
            throw new IllegalArgumentException("Start date must be before end date");
        }

        return discountRepository.save(discount);
    }

    public void deleteDiscount(Long discount_id){
        discountRepository.deleteById(discount_id);
    }

    public Discount updateDiscount(Discount discount, Long discount_id){
        Discount dbDiscount = this.discountRepository.findById(discount_id).
                orElseThrow(() -> new RuntimeException("Could not find request"));

        if(discount.getDiscountValue() > 0 && !Objects.equals(dbDiscount.getDiscountValue(),discount.getDiscountValue())){
            dbDiscount.setDiscountValue(discount.getDiscountValue());
        }

        if(discount.getStartDate() != null && discount.getEndDate() != null &&
                discount.getStartDate().after(discount.getEndDate())) {
            throw new IllegalArgumentException("Start date must be before end date");
        }

        if(discount.getStartDate() != null
                && !Objects.equals(dbDiscount.getStartDate(),discount.getStartDate())){
            dbDiscount.setStartDate(discount.getStartDate());
        }

        if(discount.getEndDate() != null
                && !Objects.equals(dbDiscount.getEndDate(),discount.getEndDate())){
            dbDiscount.setEndDate(discount.getEndDate());
        }

        return discountRepository.save(dbDiscount);
    }

    public Discount findDiscountById(Long discount_id){

        Discount discount = discountRepository.findById(discount_id)
                .orElseThrow(() -> new RuntimeException("Discount is not exist with given id: " + discount_id));

        return discount;
    }

    public List<Product> getProductsByDiscountId(Long id) {
        return productRepository.getProductsByDiscountId(id);
    }
}
