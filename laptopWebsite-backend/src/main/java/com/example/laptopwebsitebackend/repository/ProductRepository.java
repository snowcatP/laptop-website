package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Product;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

<<<<<<< HEAD
    Boolean existsByProductName(String name);
=======


    Boolean existsByProductName(String name);


    List<Product> findProductByBrand(String brand);

    List<Product> findProductByCategory(String category);

    List<Product> findProductByProductNameContains(String name);

    List<Product> findProductByPriceBetween(Double minPrice, Double maxPrice);

    List<Product> findProductsByBrandAndCategory(String brand, String category);

    List<Product> findProductsByBrandAndCategoryAndPriceBetween(String brand, String category, Double minPrice, Double maxPrice);

    List<Product> findProductsByBrandAndPriceBetween(String brand, Double minPrice, Double maxPrice);

    List<Product> findProductsByCategoryAndPriceBetween(String category, Double minPrice, Double maxPrice);

    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE %:keyword% OR LOWER(p.brand) LIKE %:keyword% OR LOWER(p.category) LIKE %:keyword%" +
            " OR LOWER(p.configuration.graphicCard) LIKE %:keyword%" +
            " OR LOWER(p.configuration.processor) LIKE %:keyword%" +
            " OR p.configuration.ram = CAST(:keyword AS int)" +
            " OR p.configuration.memory = CAST(:keyword AS int)" +
            " OR p.configuration.screen = CAST(:keyword AS double)")
    List<Product> searchByKeyword(@Param("keyword") String keyword);


>>>>>>> 70a7ac8429b1b8225bf3a26f8142c262898bdc6e
}
