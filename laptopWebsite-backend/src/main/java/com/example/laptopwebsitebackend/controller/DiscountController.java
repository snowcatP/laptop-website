package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.DiscountRequest;
import com.example.laptopwebsitebackend.dto.request.EditDiscountRequest;
import com.example.laptopwebsitebackend.entity.Discount;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.repository.ProductRepository;
import com.example.laptopwebsitebackend.service.DiscountService;
import com.example.laptopwebsitebackend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discount")
@CrossOrigin
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/add")
    public ResponseEntity<DiscountRequest> create_New_Discount(@Valid @RequestBody DiscountRequest discountRequest){

        List<Long> productStrings = discountRequest.getProducts();
        Discount discount = new Discount();
        discount.setDiscountValue(discountRequest.getDiscountValue());
        discount.setStartDate(discountRequest.getStartDate());
        discount.setEndDate(discountRequest.getEndDate());

        Discount newDiscount = discountService.addNewDiscount(discount);

        for (Long productString : productStrings) {
            Product product = productService.findProductByID(productString);
            product.setDiscount(newDiscount);
            productRepository.save(product);
        }

        return new ResponseEntity<>(discountRequest, HttpStatus.OK  );
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
    public void update_Discount( @PathVariable(name = "id") Long id,@RequestBody EditDiscountRequest request) {
        Discount discount = new Discount();
        discount.setDiscountValue(request.getDiscountValue());
        discount.setStartDate(request.getStartDate());
        discount.setEndDate(request.getEndDate());

        discountService.updateDiscount(discount,id);

        List<Long> productStrings = request.getProducts();
        for (Long productString : productStrings) {
            Product product = productService.findProductByID(productString);
            product.setDiscount(null);
            productRepository.save(product);
        }

    }

    @DeleteMapping("/delete/{id}")
    public void delete_Discount(@PathVariable("id") Long id) {
        discountService.deleteDiscount(id);
    }

    @GetMapping("/get-products/{id}")
    public ResponseEntity<List<Product>> getProductsByDiscountId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(discountService.getProductsByDiscountId(id));
    }
}
