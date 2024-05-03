package com.example.laptopwebsitebackend.config;

import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.entity.Permission;
import com.example.laptopwebsitebackend.entity.Role;
import com.example.laptopwebsitebackend.entity.Staff;
import com.example.laptopwebsitebackend.repository.AccountRepository;
import com.example.laptopwebsitebackend.repository.PermissionRepository;
import com.example.laptopwebsitebackend.repository.RoleRepository;
import com.example.laptopwebsitebackend.repository.StaffRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Slf4j
public class ApplicationInitConfig {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(AccountRepository accountRepository,
                                        StaffRepository staffRepository,
                                        RoleRepository roleRepository,
                                        PermissionRepository permissionRepository) {
        return args -> {
            if (accountRepository.findByUsername("admin@gmail.com").isEmpty()) {

                Permission permission = permissionRepository.findByPermissionName("ADMIN");

                Account adminAccount = new Account();
                adminAccount.setUsername("admin@gmail.com");
                adminAccount.setPassword(passwordEncoder.encode("admin"));
                adminAccount.setPermission(permission);

                accountRepository.save(adminAccount);

                Role role = roleRepository.findByRoleName("MANAGER");

                Staff admin = Staff.builder()
                        .firstName("admin")
                        .lastName("admin")
                        .phone("0912345678")
                        .email("admin@gmail.com")
                        .address("HCMC")
                        .salary(999D)
                        .account(adminAccount)
                        .role(role)
                        .build();

                staffRepository.save(admin);
                log.info("Admin account has been created with default username: admin@gmail.com and password: admin");
            }
        };
    }
}
