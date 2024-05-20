package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.ChangePasswordRequest;
import com.example.laptopwebsitebackend.dto.request.ChangeProfileRequest;
import com.example.laptopwebsitebackend.dto.request.StaffRequest;
import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.entity.Role;
import com.example.laptopwebsitebackend.entity.Staff;
import com.example.laptopwebsitebackend.repository.RoleRepository;
import com.example.laptopwebsitebackend.repository.StaffRepository;
import com.example.laptopwebsitebackend.service.AccountService;
import com.example.laptopwebsitebackend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class StaffController {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private StaffService staffService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AccountService accountService;

    @PostMapping("/staff")
    public ResponseEntity<Staff> createNewStaff(@RequestBody StaffRequest request) {

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

    @GetMapping("/profile")
    public ResponseEntity<Staff> getProfile() {
        return ResponseEntity.ok(staffService.getMyProfile());
    }

    @PostMapping("/changeProfile")
    public ResponseEntity<Staff> changeProfile(@RequestBody ChangeProfileRequest request) {
        return ResponseEntity.ok(staffService.changeMyProfile(request));
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Boolean> changePassword(@RequestBody ChangePasswordRequest request) {
        Boolean result = staffService.changePassword(request);
        return new ResponseEntity<>(result, result ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
