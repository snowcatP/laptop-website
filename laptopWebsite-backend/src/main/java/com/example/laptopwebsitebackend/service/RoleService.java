package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Role;
import com.example.laptopwebsitebackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Role createNewRole(Role role) {

        return roleRepository.save(role);
    }
}
