package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Product;

public class ProductSalesData {
    private Product product;
    private Long totalQuantitySold;

    public ProductSalesData(Product product, Long totalQuantitySold) {
        this.product = product;
        this.totalQuantitySold = totalQuantitySold;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Long getTotalQuantitySold() {
        return totalQuantitySold;
    }

    public void setTotalQuantitySold(Long totalQuantitySold) {
        this.totalQuantitySold = totalQuantitySold;
    }
}
