package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.*;
import com.example.laptopwebsitebackend.repository.OrderDetailsRepository;
import com.example.laptopwebsitebackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrder(Long orderId) {
        return orderRepository.findById(orderId).get();
    }

    public List<String> findAddressByOrderId(Long orderId) {
        return orderRepository.findAddressByOrderId(orderId);
    }

    public Order findOrderById(Long orderId) {
        return orderRepository.findById(orderId).get();
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrderByCustomer(Long customerId) {
        return orderRepository.findByCustomerCustomerId(customerId);

    }
    public Order createOrder(Customer customer, List<CartDetails> cartDetailsList, Payment payment){
        Order order = new Order();
        order.setCustomer(customer);
        order.setPayment(payment);
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        double totalPrice=0;
        for (CartDetails cartDetails: cartDetailsList){
            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setProduct(cartDetails.getProduct());
            orderDetails.setQuantity(cartDetails.getQuantity());
            orderDetails.setTotalPrice(cartDetails.getPrice());
            orderDetails.setOrder(order);
            orderDetailsRepository.save(orderDetails);
            totalPrice+= cartDetails.getPrice();
            orderDetailsList.add(orderDetails);
        }
        order.setTotalPrice(totalPrice);
        order.setOrderDetails(orderDetailsList);

        return orderRepository.save(order);
    }

    public String deleteById(Long orderId) {
        if (!orderRepository.existsById(orderId)){
            throw new RuntimeException("Can't delete cart item that does not exist");
        }else{
            orderRepository.deleteById(orderId);
            return "Delete item successfully";
        }
    }
}
