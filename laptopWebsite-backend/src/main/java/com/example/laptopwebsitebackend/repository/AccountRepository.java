package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUsername(String username);
}
