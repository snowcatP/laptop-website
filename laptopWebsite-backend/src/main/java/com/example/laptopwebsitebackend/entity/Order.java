package com.example.laptopwebsitebackend.entity;

import com.example.laptopwebsitebackend.state.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@Table(name = "customer_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private Double totalPrice;

    @Transient
    private OrderState state;

    @Enumerated(EnumType.STRING)
    private OrderStateType stateType;

    private String address;

    @Temporal(value = TemporalType.TIMESTAMP)
    private Date deliveredDate;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderDetails> orderDetails;
    @PostLoad
    private void postLoad() {
        this.state = getStateFromType(this.stateType);
    }
    private OrderState getStateFromType(OrderStateType stateType) {
        switch (stateType) {
            case PENDING: return new PendingState();
            case CONFIRMED: return new ConfirmedState();
            case SHIPPED: return new ShippedState();
            case DELIVERED: return new DeliveredState();
            case CANCELLED: return new CancelledState();
            default: throw new IllegalArgumentException("Unknown state type");
        }
    }
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderState getState() {
        return state;
    }

    public void setState(OrderState state) {
        this.state = state;
        this.stateType = OrderStateType.valueOf(state.getStatus().toUpperCase());
    }

    public OrderStateType getStateType() {
        return stateType;
    }

    public void setStateType(OrderStateType stateType) {
        this.stateType = stateType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDeliveredDate() {
        return deliveredDate;
    }

    public void setDeliveredDate(Date deliveredDate) {
        this.deliveredDate = deliveredDate;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public List<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public Order() {
        this.state = new PendingState();
        this.stateType = OrderStateType.PENDING;
    }
    public void nextState() {
        state.next(this);

    }

    public void previousState() {
        state.prev(this);
    }
}
