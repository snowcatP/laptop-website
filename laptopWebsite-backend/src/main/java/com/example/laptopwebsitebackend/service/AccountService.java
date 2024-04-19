package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.entity.Permission;
import com.example.laptopwebsitebackend.entity.Role;
import com.example.laptopwebsitebackend.repository.AccountRepository;
import com.example.laptopwebsitebackend.repository.PermissionRepository;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PermissionService permissionService;

    public Account createNewAccount(Account newAccount, String permission) {
        Permission userPermission = permissionService.findByPermissionName(permission);

        String password = newAccount.getPassword();

//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
//        newAccount.setPassword(passwordEncoder.encode(password));

        newAccount.setPermission(userPermission);
        return accountRepository.save(newAccount);
    }
}
