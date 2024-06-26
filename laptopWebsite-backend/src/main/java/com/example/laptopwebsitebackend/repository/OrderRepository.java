package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Order;
import com.example.laptopwebsitebackend.state.OrderStateType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query(value = "SELECT  o.orderId, o.totalPrice, o.stateType, o.address , o.deliveredDate, o.payment, o.orderDetails " +
            "from Order o")
    List<Order> getAllOrders();

    @Query(value = "SELECT o.address FROM Order o WHERE o.orderId = :orderId")
    List<String> findAddressByOrderId(Long orderId);


    List<Order> findByCustomerCustomerId(Long customerId);

    void deleteByOrderId(Long orderId);

    List<Order> findOrdersByStateType(OrderStateType stateType);

    @Query("SELECT o FROM Order o WHERE o.customer.customerId = :customerId AND o.stateType = 'DELIVERED'")
    List<Order> findDeliveredOrdersByCustomerId(Long customerId);
}