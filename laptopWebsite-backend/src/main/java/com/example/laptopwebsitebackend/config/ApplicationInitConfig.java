package com.example.laptopwebsitebackend.config;

import com.example.laptopwebsitebackend.entity.*;
import com.example.laptopwebsitebackend.repository.*;
import com.example.laptopwebsitebackend.util.PasswordEncoderSingleton;
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

    private static final PasswordEncoder passwordEncoder = PasswordEncoderSingleton.getEncoder();

    @Bean
    ApplicationRunner applicationRunner(AccountRepository accountRepository,
                                        StaffRepository staffRepository,
                                        RoleRepository roleRepository,
                                        PermissionRepository permissionRepository,
                                        PaymentRepository paymentRepository) {
        return args -> {
            if (permissionRepository.findByPermissionName("ADMIN") == null) {
                Permission permission = new Permission();
                permission.setPermissionName("ADMIN");
                permissionRepository.save(permission);
            }
            if (permissionRepository.findByPermissionName("USER") == null) {
                Permission permission = new Permission();
                permission.setPermissionName("USER");
                permissionRepository.save(permission);
            }

            if (paymentRepository.findByPaymentMethod("COD") == null) {
                Payment payment = new Payment();
                payment.setPaymentMethod("COD");
                paymentRepository.save(payment);
            }

            if (roleRepository.findByRoleName("MANAGER") == null) {
                Role role = new Role();
                role.setRoleName("MANAGER");
                roleRepository.save(role);
            }
            if (roleRepository.findByRoleName("EMPLOYEE") == null) {
                Role role = new Role();
                role.setRoleName("EMPLOYEE");
                roleRepository.save(role);
            }

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
