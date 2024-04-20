package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Payment;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getListAllPayment(){
        return paymentRepository.findAll();
    }

    public Payment addNewPayment(Payment payment){
        return paymentRepository.save(payment);
    }

    public void deletePayment(Long payment_id){
        paymentRepository.deleteById(payment_id);
    }

    public Payment updatePayment(Payment payment, Long payment_id){
        Payment dbPayment = this.paymentRepository.findById(payment_id).
                orElseThrow(() -> new RuntimeException("Could not find request"));

        if(payment.getPaymentMethod() != null && payment.getPaymentMethod().length()>0
                && !Objects.equals(dbPayment.getPaymentMethod(),payment.getPaymentMethod())){
            dbPayment.setPaymentMethod(payment.getPaymentMethod());
        }

        return paymentRepository.save(dbPayment);
    }

    public Payment findPaymentByID(Long payment_id){

        Payment payment = paymentRepository.findById(payment_id)
                .orElseThrow(() -> new RuntimeException("Payment method is not exist with given id: " + payment_id));

        return payment;
    }

}
