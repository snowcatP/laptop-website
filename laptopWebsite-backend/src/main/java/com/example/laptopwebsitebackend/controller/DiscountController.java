package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.DiscountRequest;
import com.example.laptopwebsitebackend.dto.request.EditDiscountRequest;
import com.example.laptopwebsitebackend.entity.Discount;
import com.example.laptopwebsitebackend.entity.DiscountSubject;
import com.example.laptopwebsitebackend.entity.Observer;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.repository.CustomerRepository;
import com.example.laptopwebsitebackend.repository.ProductRepository;
import com.example.laptopwebsitebackend.service.DiscountService;
import com.example.laptopwebsitebackend.service.EmailSenderService;
import com.example.laptopwebsitebackend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/discount")
@CrossOrigin
public class DiscountController implements DiscountSubject {
    @Autowired
    private EmailSenderService emailSenderService;

    private List<Observer> observers = new ArrayList<>();

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

        new Thread(() -> {
            notifyDiscount(newDiscount.getDiscountValue(), newDiscount.getStartDate(), newDiscount.getEndDate());
        }).start();
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

    @Override
    public void attach(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(String message) {
        for(Observer observer : observers) {
            observer.notifyUpdate(message);
        }
    }

    private void notifyDiscount(int discountValue, Date startDate, Date endDate){
        attach(emailSenderService);

        String message = "We're excited to announce a new discount! You can now save " + discountValue+ "% on selected products.\n\n" +
                "This is a great opportunity to treat yourself to the laptop you've been eyeing, or to grab some gifts for upcoming occasions.\n\n" +
                "The discount is valid from " + startDate +" to " + endDate + ". Shop now and take advantage of these savings!\n\n" +
                "Happy Shopping!";
        notifyObservers(message);
    }
}
