package com.example.laptopwebsitebackend.entity;

import java.util.ArrayList;
import java.util.List;

public class Subject {
    private final List<Observer> observers = new ArrayList<Observer>();
    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers(String to, String subject, String body) {
        for (Observer observer : observers) {
            observer.update(to, subject, body);
        }
    }

}
