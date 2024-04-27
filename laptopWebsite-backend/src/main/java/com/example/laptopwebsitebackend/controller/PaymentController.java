package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.entity.Payment;
import com.example.laptopwebsitebackend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/add")
    public ResponseEntity<Payment> create_New_Payment(@RequestBody Payment payment){

        Payment new_payment = new Payment();
        new_payment.setPaymentMethod(payment.getPaymentMethod());

        paymentService.addNewPayment(new_payment);

        return new ResponseEntity<>(new_payment, HttpStatus.OK  );
    }

    @GetMapping
    public ResponseEntity<List<Payment>> get_All_Payment_Method(){
        List<Payment> allPayments = paymentService.getListAllPayment();

        return new ResponseEntity<>(allPayments, HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Payment> get_Payment_By_Id(@PathVariable("id") Long payment_Id) {
        Payment payment = paymentService.findPaymentByID(payment_Id);

        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @PutMapping(value = "/edit/{id}")
    public void update_Payment( @PathVariable(name = "id") Long id,@RequestBody Payment payment) {

        Payment update_payment = new Payment();
        update_payment.setPaymentMethod(payment.getPaymentMethod());

        paymentService.updatePayment(update_payment,id);

    }

    @DeleteMapping("/delete/{id}")
    public void delete_Payment(@PathVariable("id") Long id) {
        paymentService.deletePayment(id);
    }
}
