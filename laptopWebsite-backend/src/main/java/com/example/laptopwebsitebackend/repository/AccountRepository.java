package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
