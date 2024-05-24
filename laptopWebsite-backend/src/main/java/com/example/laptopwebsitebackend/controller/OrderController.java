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

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/order")
@CrossOrigin()

public class OrderController{
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
    @Autowired
    private BillDetailsService billDetailsService;
    @Autowired
    private BillService billService;

    @Autowired
    private EmailSenderService emailSenderService;

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
            Product product = cartDetails.getProduct();
            if (product.getQuantity()<cartDetails.getQuantity()){
                return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
            }
            cartDetailsList.add(cartDetails);
            cartDetailService.deleteById(cartDetailId);

        }
        Customer customer = customerService.findCustomerById(orderRequest.getCustomerId());
        customer.setPhone(orderRequest.getPhone());

        customer.setAddress(orderRequest.getAddress());

        customer.setEmail(orderRequest.getEmail());

        Order result = orderService.checkout(customer,cartDetailsList,paymentMethod,orderRequest.getAddress());
        if(result != null) {
            emailSenderService.sendEmail(customer.getEmail(),
                    "Electro - Order status",
                    "Order has been placed successfully. You can track your order status, also bill in your profile!");
        }

        return new ResponseEntity<>(result,HttpStatus.OK);

    }
    @PostMapping("/change-order-state/{orderId}")
    public ResponseEntity<Order> changeOrderState(@PathVariable("orderId") Long orderId){
        Order order = orderService.findOrderById(orderId);
        if(order.getStateType()!= OrderStateType.CANCELLED&&order.getStateType()!= OrderStateType.DELIVERED){
            if (order.getStateType() == OrderStateType.CONFIRMED){
                order.setDeliveredDate(new Date());
            }
            else if (order.getStateType() == OrderStateType.SHIPPED) {
                List<BillDetails>  billDetailsList = new ArrayList<>();
                Bill bill = new Bill();
                for(OrderDetails orderDetails: order.getOrderDetails()){
                    Product product = orderDetails.getProduct();
                    BillDetails billDetails = new BillDetails();
                    billDetails.setProduct(product);
                    billDetails.setQuantity(orderDetails.getQuantity());
                    billDetails.setTotalPrice(orderDetails.getTotalPrice());
                    billDetails.setBill(bill);
                    billDetailsList.add(billDetails);
                    billDetailsService.addBillDetails(billDetails);
                }

                bill.setBillDetailsList(billDetailsList);
                bill.setCustomer(order.getCustomer());
                bill.setTotalPrice(order.getTotalPrice());
                bill.setDateCreated(new Date());
                billService.addBill(bill);

            }
                order.nextState();
            return new ResponseEntity<>(orderService.updateOrder(order),HttpStatus.OK);
        }


        return new ResponseEntity<>(orderService.updateOrder(order),HttpStatus.EXPECTATION_FAILED);
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
        return new ResponseEntity<>(orderService.updateOrder(order),HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countAllOrders() {
        long orderCount = orderService.countAllOrders();
        return new ResponseEntity<>(orderCount, HttpStatus.OK);
    }

    @GetMapping("/total-revenue")
    public ResponseEntity<Double> getTotalRevenue() {
        Double totalRevenue = orderService.calculateTotalRevenue();
        return new ResponseEntity<>(totalRevenue, HttpStatus.OK);
    }

    @GetMapping("/top-selling-products")
    public ResponseEntity<List<ProductSalesData>> getTopSellingProducts() {
        List<ProductSalesData> topSellingProducts = orderService.getTopSellingProducts(5);
        return new ResponseEntity<>(topSellingProducts, HttpStatus.OK);
    }

    @GetMapping("/delivered-orders/{customerId}")
    public ResponseEntity<List<Order>> getDeliveredOrdersByCustomerId(@PathVariable("customerId") Long customerId) {
        List<Order> deliveredOrders = orderService.getDeliveredOrdersByCustomerId(customerId);
        return new ResponseEntity<>(deliveredOrders, HttpStatus.OK);
    }
}
