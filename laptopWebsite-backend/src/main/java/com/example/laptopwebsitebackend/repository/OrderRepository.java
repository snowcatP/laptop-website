package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
//Long orderId, Long orderDetailsId, String state, String address, Date deliveredDate, int quantity,
//                          String totalPrice, String productName,  int ram, String processor, Double screen, int memory, String graphicCard
//    @Query(value = "SELECT new OrderResultDTO (o.orderId, od.orderDetailsId, o.state,o.address," +
//            "o.deliveredDate,od.quantity,od.totalPrice, od.product.productName, od.product.brand, " +
//            "od.product.configuration.ram, od.product.configuration.processor,od.product.configuration.screen," +
//            "od.product.configuration.memory, od.product.configuration.graphicCard) " +
//        "from   OrderDetails od  JOIN od.order o  ")
    @Query(value = "SELECT  o.orderId, o.totalPrice, o.state, o.address , o.deliveredDate, o.payment, o.orderDetails " +
            "from Order o")
    List<Order> getAllOrders();

    @Query(value = "SELECT o.address FROM Order o WHERE o.orderId = :orderId")
    List<String> findAddressByOrderId(Long orderId);

    List<Order> findAll();

    List<Order> findByCustomerCustomerId(Long customerId);
}
