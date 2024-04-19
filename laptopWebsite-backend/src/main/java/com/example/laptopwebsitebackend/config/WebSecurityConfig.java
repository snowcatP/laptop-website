package com.example.laptopwebsitebackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(
                        auth -> auth
//                                .requestMatchers("/user/**").authenticated()
//                                .requestMatchers("/admin/**").authenticated()
//                                //.requestMatchers("/login*").permitAll()
//                                .requestMatchers("/**").permitAll()
                                .anyRequest().permitAll()
                )
//                .formLogin(form -> form
//                        .loginPage("/login")
//                        .loginProcessingUrl("/loginPost")
//                        .defaultSuccessUrl("/user")
//                        .failureForwardUrl("/loginGet")
//                )
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
