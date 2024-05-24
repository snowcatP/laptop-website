package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Order;
import com.example.laptopwebsitebackend.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
    @Query("SELECT o FROM Order o WHERE  o.customer.customerId=?1 AND o.stateType='DELIVERED'")
    List<Order> getBillByCustomer(Long customerId);

    @Query("SELECT od.product.productId, SUM(od.quantity) as totalQuantity " +
            "FROM OrderDetails od JOIN od.order o " +
            "WHERE o.stateType = 'DELIVERED' " +
            "GROUP BY od.product.productId " +
            "ORDER BY totalQuantity DESC")
    List<Object[]> findTopSellingProducts();
}