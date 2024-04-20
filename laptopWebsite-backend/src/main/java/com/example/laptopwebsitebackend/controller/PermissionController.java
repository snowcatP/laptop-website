package com.example.laptopwebsitebackend.controller;


import com.example.laptopwebsitebackend.entity.Permission;
import com.example.laptopwebsitebackend.repository.PermissionRepository;
import com.example.laptopwebsitebackend.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/permission")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @PostMapping
    public ResponseEntity<Permission> createNewPermission(@RequestBody Permission permission) {
        Permission newPermission = permissionService.createNewPermission(permission);

        return ResponseEntity.ok(newPermission);
    }

    @GetMapping
    public ResponseEntity<List<Permission>> getAllPermissions() {
        return ResponseEntity.ok(permissionService.getPermissions());
    }
}
