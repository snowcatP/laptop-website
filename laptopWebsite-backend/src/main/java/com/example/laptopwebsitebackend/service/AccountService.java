package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.entity.Permission;
import com.example.laptopwebsitebackend.entity.Role;
import com.example.laptopwebsitebackend.repository.AccountRepository;
import com.example.laptopwebsitebackend.repository.PermissionRepository;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PermissionService permissionService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    public Account createNewAccount(Account newAccount, String permission) {
        Permission userPermission = permissionService.findByPermissionName(permission);

        if (accountRepository.findByUsername(newAccount.getUsername()).isPresent()){
            throw new RuntimeException("Username been used");
        }

        newAccount.setPermission(userPermission);
        return accountRepository.save(newAccount);
    }

    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Wrong username or password"));
    }

    public void resetPassword(Account account, String newPassword) {
        account.setPassword(passwordEncoder.encode(newPassword));

        accountRepository.save(account);
    }
}
