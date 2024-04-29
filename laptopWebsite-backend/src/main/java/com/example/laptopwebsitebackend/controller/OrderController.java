package com.example.laptopwebsitebackend.controller;


import com.example.laptopwebsitebackend.entity.*;
import com.example.laptopwebsitebackend.service.CustomerService;
import com.example.laptopwebsitebackend.service.OrderDetailsService;
import com.example.laptopwebsitebackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderDetailsService orderDetailsService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CustomerService customerService;

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrders(){
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderInformation(@PathVariable("orderId") Long orderId){
        return new ResponseEntity<>(orderService.getOrder(orderId), HttpStatus.OK);

    }

    @GetMapping("/order-details/{orderId}")
    public ResponseEntity<List<OrderDetails>> getAllOrderDetails(@PathVariable("orderId") Long orderId){
        return new ResponseEntity<>(orderDetailsService.findOrderDetailsByOrderId(orderId), HttpStatus.OK);
    }

    @PostMapping("edit-order-details/{orderDetailsId}/{new_quantity}")
    public ResponseEntity<OrderDetails> editOrderDetails(@PathVariable("orderDetailsId") Long orderDetailsId,
                                               @PathVariable("quatity") int new_quantity){
        OrderDetails orderDetails = orderDetailsService.findById(orderDetailsId);
        Product product = orderDetails.getProduct();

        int quantity = orderDetails.getQuantity();
        orderDetails.setQuantity(new_quantity);

        //Update the total price of this item
        int discountValue = (product.getDiscount()!=null) ? product.getDiscount().getDiscountValue() : 0;
        double costPrice = product.getPrice();
        Locale localeVN = new Locale("vi", "VN");
        NumberFormat currencyVN = NumberFormat.getCurrencyInstance(localeVN);
        Double totalPrice = costPrice*new_quantity;
        String totalPriceStr = currencyVN.format(totalPrice-(totalPrice*discountValue/100));
        orderDetails.setTotalPrice(totalPriceStr);

        //Update the availibility quantity of this product
        product.setQuantity(product.getQuantity()-(new_quantity-quantity));

        return new ResponseEntity<>(orderDetailsService.updateOrderDetails(orderDetails),HttpStatus.OK);

    }
    @PostMapping("/delete-order/{orderDetailsId}")
    public ResponseEntity<String> deleteItemtoCart(@PathVariable("orderDetailsId") Long orderDetailsId){
        OrderDetails orderDetails = orderDetailsService.findById(orderDetailsId);
        Product product = orderDetails.getProduct();

        //Update the availibility quantity of this product
        int quantity = orderDetails.getQuantity();
        product.setQuantity(product.getQuantity()+quantity);

        return ResponseEntity.ok(orderDetailsService.deleteById(orderDetailsId));
    }





}
