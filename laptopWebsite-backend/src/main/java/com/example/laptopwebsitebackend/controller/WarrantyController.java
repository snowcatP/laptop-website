package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.DiscountRequest;
import com.example.laptopwebsitebackend.dto.request.ProductRequest;
import com.example.laptopwebsitebackend.dto.request.WarrantyRequest;
import com.example.laptopwebsitebackend.entity.Discount;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.entity.Warranty;
import com.example.laptopwebsitebackend.service.CustomerService;
import com.example.laptopwebsitebackend.service.DiscountService;
import com.example.laptopwebsitebackend.service.ProductService;
import com.example.laptopwebsitebackend.service.WarrantyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warranty")
@CrossOrigin
public class WarrantyController {

    @Autowired
    private WarrantyService warrantyService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<Warranty> create_New_Warranty(@Valid @RequestBody WarrantyRequest warrantyRequest){

        Warranty warranty = new Warranty();
        warranty.setDateExpired(warrantyRequest.getDateExpired());
        warranty.setDateStart(warrantyRequest.getDateStart());
        warranty.setProductCode(warrantyRequest.getProductCode());
        warranty.setCustomer(customerService.findCustomerById(warrantyRequest.getCustomer_id()));
        warranty.setProduct(productService.findProductByID(warrantyRequest.getProduct_id()));

        warrantyService.addNewWarranty(warranty);
        return new ResponseEntity<>(warranty, HttpStatus.OK  );

    }

    @GetMapping
    public ResponseEntity<List<Warranty>> get_All_Warranty(){
        List<Warranty> allWarranties = warrantyService.getListAllWarranty();

        return new ResponseEntity<>(allWarranties, HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Warranty> get_Warranty_By_Id(@PathVariable("id") Long warranty_Id) {
        Warranty warranty = warrantyService.findWarranty(warranty_Id);

        return new ResponseEntity<>(warranty, HttpStatus.OK);
    }

    @PutMapping(value = "/edit/{id}")
    public void update_Warranty( @PathVariable(name = "id") Long id,@RequestBody WarrantyRequest warrantyRequest) {

        Warranty warranty = new Warranty();
        warranty.setDateExpired(warrantyRequest.getDateExpired());
        warranty.setDateStart(warrantyRequest.getDateStart());
        warranty.setProductCode(warrantyRequest.getProductCode());

        warrantyService.updateWarranty(warranty,id);

    }

    @DeleteMapping("/delete/{id}")
    public void delete_Warranty(@PathVariable("id") Long id) {

        warrantyService.deleteWarranty(id);
    }

    @GetMapping("/customer/{id}")
    public ResponseEntity<List<Warranty>> get_List_Warranty_By_Customer_Id(@PathVariable("id") Long customer_Id) {
        List<Warranty> warrantyList = warrantyService.findWarrantyByCustomerId(customer_Id);
        return new ResponseEntity<>(warrantyList, HttpStatus.OK);
    }

}
