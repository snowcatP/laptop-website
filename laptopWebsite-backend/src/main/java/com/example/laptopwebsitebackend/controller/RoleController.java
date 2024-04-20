package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.entity.Role;
import com.example.laptopwebsitebackend.repository.RoleRepository;
import com.example.laptopwebsitebackend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/role")
public class RoleController {

    @Autowired
    private RoleService roleService;
    @PostMapping
    public ResponseEntity<Role> createNewRole(@RequestBody Role role) {
        Role newRole = roleService.createNewRole(role);
        return ResponseEntity.ok(newRole);
    }

    @GetMapping
    public ResponseEntity<List<Role>> getRoles() {
        List<Role> allRoles = roleService.getRoles();
        return ResponseEntity.ok(allRoles);
    }
}
