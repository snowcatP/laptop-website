package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(String role);
}
