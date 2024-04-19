package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Permission findByPermissionName(String permission);
}
