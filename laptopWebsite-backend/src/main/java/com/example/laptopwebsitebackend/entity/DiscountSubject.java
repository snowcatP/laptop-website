package com.example.laptopwebsitebackend.entity;


public interface DiscountSubject{
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers(String message);
}
