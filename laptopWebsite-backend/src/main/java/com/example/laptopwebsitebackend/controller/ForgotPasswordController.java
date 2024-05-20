package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.dto.request.ResetPasswordRequest;
import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.service.AccountService;
import com.example.laptopwebsitebackend.service.AuthenticationService;
import com.example.laptopwebsitebackend.service.EmailSenderService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;

@RestController
@CrossOrigin
public class ForgotPasswordController {

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private AccountService accountService;

    @Value("${api.endpoint}")
    private String apiEndpoint;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody String email) {
        email = email.replace("%40", "@") + "om";

        Account account = accountService.findByUsername(email);

        if (account == null) {
            return ResponseEntity.badRequest().body("User not exist!");
        }

        String resetToken = authenticationService.generateResetPasswordToken(email);

        String resetLink = apiEndpoint + "/reset-password/"+ resetToken;

        try {
            emailSenderService.sendEmail(email,
                    "Electro - Password reset",
                    "To reset your password of Electro account, please click to this link below:\n" +
                            resetLink + "\n\nThis link will expire in 30 minutes.");
            return ResponseEntity.ok("Send email successful");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest()
                .body("Something went wrong, can't send mail to your email!");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {

        String[] chunks = request.getToken().split("\\.");

        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));

        JSONObject jsonObject = new JSONObject(payload);
        String email = jsonObject.getString("sub");

        Account account = accountService.findByUsername(email);

        if (account == null) {
            return ResponseEntity.badRequest().body("User not exist!");
        }

        accountService.resetPassword(account, request.getNewPassword());

        return ResponseEntity.ok("Change password successful");
    }
}
