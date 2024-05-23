package com.example.laptopwebsitebackend.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderSingleton {
    private static volatile PasswordEncoder encoder;
    private PasswordEncoderSingleton() {}
    public static PasswordEncoder getEncoder() {
        if (encoder == null) {
            synchronized (PasswordEncoderSingleton.class) {
                if (encoder == null) {
                    encoder = new BCryptPasswordEncoder(10);
                }
            }
        }
        return encoder;
    }
}
