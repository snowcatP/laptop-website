package com.example.laptopwebsitebackend.service;
import com.example.laptopwebsitebackend.dto.request.ChangePasswordRequest;
import com.example.laptopwebsitebackend.dto.request.ChangeProfileRequest;
import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.entity.Staff;
import com.example.laptopwebsitebackend.repository.AccountRepository;
import com.example.laptopwebsitebackend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public Staff getMyProfile() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Staff myProfile = staffRepository.findByEmail(name)
                .orElseThrow(() -> new RuntimeException("User is not exist"));

        return myProfile;
    }

    public Staff changeMyProfile(ChangeProfileRequest staff) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Staff myProfile = staffRepository.findByEmail(name)
                .orElseThrow(() -> new RuntimeException("User is not exist"));

        myProfile.setFirstName(staff.getFirstName());
        myProfile.setLastName(staff.getLastName());
        myProfile.setPhone(staff.getPhone());
        myProfile.setAddress(staff.getAddress());

        return staffRepository.save(myProfile);
    }

    public Boolean changePassword(ChangePasswordRequest passwordRequest) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Account account = accountRepository.findByUsername(name)
                .orElseThrow(() -> new RuntimeException("User is not exist"));
        if (passwordEncoder.matches(passwordRequest.getOldPassword(), account.getPassword()) &&
                passwordRequest.getNewPassword().equals(passwordRequest.getConfirmPassword())) {
            account.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
            accountRepository.save(account);
            return true;
        }
        return false;
    }
}
