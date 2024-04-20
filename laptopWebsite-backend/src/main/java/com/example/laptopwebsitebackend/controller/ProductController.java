package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.ProductRequest;
import com.example.laptopwebsitebackend.entity.Configuration;
import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.repository.ConfigurationRepository;
import com.example.laptopwebsitebackend.service.ConfigurationService;
import com.example.laptopwebsitebackend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ConfigurationService configurationService;

    @PostMapping("/add")
    public ResponseEntity<Product> create_New_Product(@Valid @RequestBody ProductRequest productRequest){

        Configuration configuration = new Configuration();
        configuration.setRam(productRequest.getRam());
        configuration.setProcessor(productRequest.getProcessor());
        configuration.setScreen(productRequest.getScreen());
        configuration.setMemory(productRequest.getMemory());
        configuration.setGraphicCard(productRequest.getGraphicCard());

        configurationService.addNewConfiguration(configuration);

        Product newProduct = new Product();
        newProduct.setProductName(productRequest.getProductName());
        newProduct.setQuantity(productRequest.getQuantity());
        newProduct.setPrice(productRequest.getPrice());
        newProduct.setBrand(productRequest.getBrand());
        newProduct.setConfiguration(configuration);

        productService.addNewProduct(newProduct);

        return new ResponseEntity<>(newProduct, HttpStatus.OK  );
    }

    @GetMapping
    public ResponseEntity<List<Product>> get_All_Products(){
        List<Product> allProducts = productService.getListAllProduct();

        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Product> get_Product_By_Id(@PathVariable("id") Long product_Id) {
        Product product = productService.findProductByID(product_Id);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PutMapping(value = "/edit/{id}")
    public void update_Product( @PathVariable(name = "id") Long id,@RequestBody ProductRequest productRequest) {

        Configuration configuration= new Configuration();
        configuration.setRam(productRequest.getRam());
        configuration.setProcessor(productRequest.getProcessor());
        configuration.setScreen(productRequest.getScreen());
        configuration.setMemory(productRequest.getMemory());
        configuration.setGraphicCard(productRequest.getGraphicCard());

        Long configuration_id = productService.find_Configuration_Id(id);
        configurationService.updateConfiguration(configuration, configuration_id);

        Product product = new Product();
        product.setProductName(productRequest.getProductName());
        product.setQuantity(productRequest.getQuantity());
        product.setPrice(productRequest.getPrice());
        product.setBrand(productRequest.getBrand());

        productService.updateProduct(product, id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete_Product(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
    }

}
