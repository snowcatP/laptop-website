package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Staff;
import com.example.laptopwebsitebackend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;

    public Staff getMyProfile() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Staff myProfile = staffRepository.findByEmail(name)
                .orElseThrow(() -> new RuntimeException("User is not exist"));

        return myProfile;
    }
}
