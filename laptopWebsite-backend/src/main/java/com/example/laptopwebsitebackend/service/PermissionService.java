package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Permission;
import com.example.laptopwebsitebackend.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;
    public Permission findByPermissionName(String permission) {
        return permissionRepository.findByPermissionName(permission);
    }

    public List<Permission> getPermissions() {
        return permissionRepository.findAll();
    }

    public Permission createNewPermission(Permission permission) {
        return permissionRepository.save(permission);
    }
}
