package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.StaffRequest;
import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.entity.Role;
import com.example.laptopwebsitebackend.entity.Staff;
import com.example.laptopwebsitebackend.repository.RoleRepository;
import com.example.laptopwebsitebackend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/staff")
public class StaffController {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    private ResponseEntity<Staff> createNewStaff(@RequestBody StaffRequest request) {

        Account newAccount = new Account();
        newAccount.setUsername(request.getEmail());
        newAccount.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findByRoleName("EMPLOYEE");

        Staff newStaff = new Staff();
        newStaff.setFirstName(request.getFirstName());
        newStaff.setLastName(request.getLastName());
        newStaff.setAddress(request.getAddress());
        newStaff.setPhone(request.getPhone());
        newStaff.setSalary(request.getSalary());
        newStaff.setRole(role);
        newStaff.setAccount(newAccount);

        return ResponseEntity.ok(staffRepository.save(newStaff));
    }
}
