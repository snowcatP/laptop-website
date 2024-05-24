package com.example.laptopwebsitebackend.controller;


import com.example.laptopwebsitebackend.entity.*;
import com.example.laptopwebsitebackend.service.*;
import com.example.laptopwebsitebackend.state.CancelledState;
import com.example.laptopwebsitebackend.state.OrderStateType;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.laptopwebsitebackend.dto.request.OrderRequest;
import java.util.*;

@RestController
@RequestMapping("/order")
    @CrossOrigin(origins = {"http://localhost:3001","http://localhost:3000"})

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
    @GetMapping("/bills-of-customer/{customerId}")
    public ResponseEntity<List<Order>> getBillByCustomer(@PathVariable("customerId") Long customerId){
        return new ResponseEntity<>(orderService.getBillByCustomer(customerId),HttpStatus.OK);
    }
    private Double calculateTotalPrice(Product product, int quantity){
        int discountValue = (product.getDiscount() != null) ? product.getDiscount().getDiscountValue() : 0;
        double costPrice = product.getPrice();
        Double Price = costPrice * quantity;
        Price = Price - (Price * discountValue / 100);
        return Price;
    }
    @PostMapping("/edit-order-details/{orderDetailsId}/{new_quantity}")
    public ResponseEntity<OrderDetails> editOrderDetails(@PathVariable("orderDetailsId") Long orderDetailsId,
                                                         @PathVariable("quatity") int new_quantity){
        OrderDetails orderDetails = orderDetailsService.findById(orderDetailsId);
        Product product = orderDetails.getProduct();

        int quantity = orderDetails.getQuantity();
        orderDetails.setQuantity(new_quantity);

        //Update the total price of this item
        orderDetails.setTotalPrice(calculateTotalPrice(product, quantity));

        //Update the availibility quantity of this product
        product.setQuantity(product.getQuantity()-(new_quantity-quantity));

        return new ResponseEntity<>(orderDetailsService.updateOrderDetails(orderDetails),HttpStatus.OK);

    }
    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(@Valid @RequestBody OrderRequest orderRequest){
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

        return new ResponseEntity<>(orderService.checkout(customer,cartDetailsList,paymentMethod,orderRequest.getAddress()),HttpStatus.OK);
    }
    @PostMapping("/change-order-state/{orderId}")
    public ResponseEntity<Order> changeOrderState(@PathVariable("orderId") Long orderId){
        Order order = orderService.findOrderById(orderId);
        order.nextState();
        return new ResponseEntity<>(orderService.updateOrder(order),HttpStatus.OK);
    }
    @PostMapping("/cancel-order/{orderId}")
    public ResponseEntity<Order> cancelOrder(@PathVariable("orderId") Long orderId){
        Order order = orderService.findOrderById(orderId);
        if (order.getStateType()== OrderStateType.PENDING){
            List<OrderDetails> orderDetailsList = order.getOrderDetails();
            for(OrderDetails orderDetails: orderDetailsList){
                Product product = orderDetails.getProduct();
                product.setQuantity(product.getQuantity()+orderDetails.getQuantity());
            }
            order.setState(new CancelledState());
            return new ResponseEntity<>(orderService.updateOrder(order),HttpStatus.OK);
        }
        return new ResponseEntity<>(orderService.updateOrder(order),HttpStatus.EXPECTATION_FAILED);
    }
   public void DEF(){

   }


}
