package com.example.laptopwebsitebackend.controller;


import com.example.laptopwebsitebackend.entity.*;
import com.example.laptopwebsitebackend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderDetailsService orderDetailsService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private ProductService productService;


    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrders(){
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderInformation(@PathVariable("orderId") Long orderId){
        return new ResponseEntity<>(orderService.getOrder(orderId), HttpStatus.OK);

    }

    @GetMapping("/orders-of-customer/{customerId}")
    public ResponseEntity<List<Order>> getOrderByCustomer(@PathVariable("customerId") Long customerId){
        return new ResponseEntity<>(orderService.getOrderByCustomer(customerId), HttpStatus.OK);
    }

//    @GetMapping("/order-details/{orderId}")
//    public ResponseEntity<List<OrderDetails>> getAllOrderDetails(@PathVariable("orderId") Long orderId){
//        return new ResponseEntity<>(orderDetailsService.findOrderDetailsByOrderId(orderId), HttpStatus.OK);
//    }

    @PostMapping("/add-product-to-order/{customerId}/{productId}/{quantity}")
    public ResponseEntity<Order> addProductToOrder(@PathVariable("customerId")Long customerId,@PathVariable("productId")Long productId,@PathVariable("quantity")int quantity ){
        Product product = productService.findProductByID(productId);
        OrderDetails orderDetails = new OrderDetails();
        Customer customer = customerService.findCustomerById(customerId);
        //Calculate the total price of this item
        int discountValue = (product.getDiscount()!=null) ? product.getDiscount().getDiscountValue() : 0;
        double costPrice = product.getPrice();
        Locale localeVN = new Locale("vi", "VN");
        NumberFormat currencyVN = NumberFormat.getCurrencyInstance(localeVN);
        Double totalPrice = costPrice*quantity;
        String totalPriceStr = currencyVN.format(totalPrice-(totalPrice*discountValue/100));

        orderDetails.setTotalPrice(totalPriceStr);
        orderDetails.setProduct(product);

        //Update the availibility quantity of this product
        product.setQuantity(product.getQuantity()-quantity);
        orderDetails.setQuantity(quantity);

        orderDetailsService.updateOrderDetails(orderDetails);

        Order order = new Order();
        order.setCustomer(customer);
        order.setTotalPrice(totalPriceStr);
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        orderDetailsList.add(orderDetails);
        order.setOrderDetails(orderDetailsList);

        return new ResponseEntity<>(orderService.addOrder(order),HttpStatus.OK);
    }

    @PostMapping("/edit-order-details/{orderDetailsId}/{new_quantity}")
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
