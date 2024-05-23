package com.example.laptopwebsitebackend.controller;


import com.example.laptopwebsitebackend.entity.*;
import com.example.laptopwebsitebackend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.laptopwebsitebackend.dto.request.OrderRequest;
import java.util.*;

@RestController
@RequestMapping("/order")
@CrossOrigin

public class OrderController {
    @Autowired
    private OrderDetailsService orderDetailsService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private CartDetailService cartDetailService;

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

    @PostMapping("/checkout")
    public ResponseEntity<Order> addProductToOrder(@Valid @RequestBody OrderRequest orderRequest){
        OrderDetails orderDetails = new OrderDetails();

        Payment paymentMethod = paymentService.findPaymentByID(orderRequest.getPaymentId());
        List<CartDetails> cartDetailsList = new ArrayList<>();
        for(Long cartDetailId: orderRequest.getLstCartDetailsId()){
            CartDetails cartDetails = cartDetailService.findById(cartDetailId);
            cartDetailsList.add(cartDetails);
            cartDetailService.deleteById(cartDetailId);

        }


        Customer customer = customerService.findCustomerById(orderRequest.getCustomerId());
        customer.setPhone(orderRequest.getPhone());
        customer.setEmail(orderRequest.getEmail());

        return new ResponseEntity<>(orderService.createOrder(customer,cartDetailsList,paymentMethod),HttpStatus.OK);
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
        Double Price = costPrice*new_quantity;
        Double totalPrice = Price-(Price*discountValue/100);
        orderDetails.setTotalPrice(totalPrice);

        //Update the availibility quantity of this product
        product.setQuantity(product.getQuantity()-(new_quantity-quantity));



        return new ResponseEntity<>(orderDetailsService.updateOrderDetails(orderDetails),HttpStatus.OK);

    }

    @PostMapping("/delete-order/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable("orderId") Long orderId){
        Order order = orderService.findOrderById(orderId);
        for(OrderDetails orderDetails: order.getOrderDetails()){
            Product product = orderDetails.getProduct();
            //Update the availibility quantity of this product
            int quantity = orderDetails.getQuantity();
            product.setQuantity(product.getQuantity()+quantity);
        }

        return ResponseEntity.ok(orderService.deleteById(orderId));
    }
}