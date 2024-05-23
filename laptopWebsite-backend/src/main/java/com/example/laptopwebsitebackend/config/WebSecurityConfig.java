package com.example.laptopwebsitebackend.config;

import com.example.laptopwebsitebackend.dto.request.IntrospectRequest;
import com.example.laptopwebsitebackend.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig{

    private final String[] PUBLIC_ENDPOINT = {
    // URL for authentication
            "/auth/login",
            "/auth/introspect",
            "/auth/logout",
            "/auth/register",
            "/auth/admin-login",
            "/forgot-password",
            "/reset-password",
            "/",
            "/store",
            "/product/**",
            "/comment/**",
            "/comment",
            "/comment/add",
            "/discount",
            "/discount/*",
            "/warranty",
            "/warranty/**",
            "/user",
            "/user/**"

    };

    @Value("${jwt.signerKey}")
    private String signerKey;

    @Autowired
    private CustomJwtDecoder customJwtDecoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.GET, "/product").permitAll()
                        .requestMatchers(HttpMethod.GET, "/product/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/product/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/product/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/discount").permitAll()
                        .requestMatchers(HttpMethod.GET, "/discount/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/warranty").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/warranty/**").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/warranty/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/comment").permitAll()
                        .requestMatchers(HttpMethod.GET, "/comment/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/user").permitAll()
                        .requestMatchers(HttpMethod.GET, "/user/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/user/**").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/cart/**").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/order/**").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/order/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/warranty/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/warranty/**").hasRole("ADMIN")
                        .anyRequest().authenticated());


        http
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwtConfigurer ->
                                jwtConfigurer.decoder(customJwtDecoder)
                                        .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                );

        return http.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

    @Bean
    JwtDecoder jwtDecoder(){

        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS256");

        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}

