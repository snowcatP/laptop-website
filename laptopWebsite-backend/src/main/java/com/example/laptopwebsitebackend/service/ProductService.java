package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Configuration;
import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Predicate;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ConfigurationService configurationService;

    public List<Product> getListAllProduct(){
        return productRepository.findAll();
    }

    public Product addNewProduct(Product product){
        if (productRepository.existsByProductName(product.getProductName())){
            throw new RuntimeException("Product has existed");
        }
        return productRepository.save(product);
    }

    public void deleteProduct(Long product_id){
        productRepository.deleteById(product_id);
    }

    public Product updateProduct(Product product, Long product_id){
        Product dbProduct = this.productRepository.findById(product_id).
                orElseThrow(() -> new RuntimeException("Could not find request"));

        if(product.getProductName() != null && product.getProductName().length()>0
                && !Objects.equals(dbProduct.getProductName(),product.getProductName())){
            dbProduct.setProductName(product.getProductName());
        }

        if(product.getPrice() != null && product.getPrice() !=0
                && !Objects.equals(dbProduct.getPrice(),product.getPrice())){
            dbProduct.setPrice(product.getPrice());
        }

        if(product.getQuantity() > 0 && !Objects.equals(dbProduct.getQuantity(),product.getQuantity())){
            dbProduct.setQuantity(product.getQuantity());
        }

        if(product.getBrand() != null && product.getBrand().length()>0
                && !Objects.equals(dbProduct.getBrand(),product.getBrand())){
            dbProduct.setBrand(product.getBrand());
        }

        if(product.getCategory() != null && product.getCategory().length()>0
                && !Objects.equals(dbProduct.getCategory(),product.getCategory())){
            dbProduct.setCategory(product.getCategory());
        }

        if(product.getImage1() != null && product.getImage1().length()>0
                && !Objects.equals(dbProduct.getImage1(),product.getImage1())){{
                    dbProduct.setImage1(product.getImage1());
        }}

        if(product.getImage2() != null && product.getImage2().length()>0
                && !Objects.equals(dbProduct.getImage2(),product.getImage2())){{
            dbProduct.setImage2(product.getImage2());
        }}

        if(product.getImage3() != null && product.getImage3().length()>0
                && !Objects.equals(dbProduct.getImage3(),product.getImage3())){{
            dbProduct.setImage3(product.getImage3());
        }}

        if(product.getImage4() != null && product.getImage4().length()>0
                && !Objects.equals(dbProduct.getImage4(),product.getImage4())){{
            dbProduct.setImage4(product.getImage4());
        }}


        return productRepository.save(dbProduct);
    }

    public Product findProductByID(Long product_id){

        Product product = productRepository.findById(product_id)
                .orElseThrow(() -> new RuntimeException("Product is not exist with given id: " + product_id));

        return product;
    }

    public Long find_Configuration_Id(Long product_id){
        return productRepository.findById(product_id).get().getConfiguration().getConfigurationId();
    }

    public List<Product> get_Top_Six_Highest_Priced_Products() {
        // Tạo một trang đầu tiên có 6 sản phẩm, sắp xếp theo giá giảm dần
        PageRequest pageable = PageRequest.of(0, 6, Sort.by("price").descending());
        return productRepository.findAll(pageable).getContent();
    }

    public List<Product> get_Top_Nine_Highest_Priced_Products() {
        // Tạo một trang đầu tiên có 9 sản phẩm, sắp xếp theo giá giảm dần
        PageRequest pageable = PageRequest.of(0, 9, Sort.by("price").descending());
        return productRepository.findAll(pageable).getContent();
    }


    public List<Product> searchProducts(String keyword,String category, String brand, Double minPrice, Double maxPrice) {

        if (keyword!=null){
           return productRepository.searchByKeyword(keyword);
        }
        if( brand!=null && category != null && (minPrice!= null && maxPrice != null)){
            return productRepository.findProductsByBrandAndCategoryAndPriceBetween(brand,category,minPrice,maxPrice);
        }

        if(brand!=null && category != null){
            return productRepository.findProductsByBrandAndCategory(brand,category);
        }

        if(brand!=null && (minPrice!=null && maxPrice!=null)){
            return productRepository.findProductsByBrandAndPriceBetween(brand,minPrice,maxPrice);
        }

        if(category!=null && (minPrice!=null && maxPrice!=null)){
            return productRepository.findProductsByCategoryAndPriceBetween(category,minPrice,maxPrice);
        }
        if (category != null) {

            // Tìm kiếm theo category
            return productRepository.findProductByCategory(category);
        }

        if (brand !=null) {

            return productRepository.findProductByBrand(brand);

        }

        if (minPrice != null && maxPrice != null) {

            return productRepository.findProductByPriceBetween(minPrice,maxPrice);

        }
        
            return productRepository.findAll();
    }


}
