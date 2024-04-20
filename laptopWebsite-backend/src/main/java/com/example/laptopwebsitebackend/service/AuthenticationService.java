package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.dto.request.AuthenticationRequest;
import com.example.laptopwebsitebackend.dto.request.IntrospectRequest;
import com.example.laptopwebsitebackend.dto.response.AuthenticationResponse;
import com.example.laptopwebsitebackend.dto.response.IntrospectResponse;
import com.example.laptopwebsitebackend.entity.Account;
import com.example.laptopwebsitebackend.entity.Customer;
import com.example.laptopwebsitebackend.entity.Staff;
import com.example.laptopwebsitebackend.repository.AccountRepository;
import com.example.laptopwebsitebackend.repository.CustomerRepository;
import com.example.laptopwebsitebackend.repository.StaffRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class AuthenticationService {

    @Autowired
    private CustomerRepository customerRepository;

    // Get signerKey value from file application.yml
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private StaffRepository staffRepository;

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception {
        Account account = accountRepository.findByUsername(request.getUsername());

        Staff staff = new Staff();
        Customer customer = new Customer();
        boolean checkPermission = false;

        if (account.getPermission().getPermissionName().equals("ADMIN")) {
            checkPermission = true;
            staff = staffRepository.findByEmail(request.getUsername())
                    .orElseThrow(() -> new Exception("Employee is not exist"));
        } else {
            customer = customerRepository.findByEmail(request.getUsername())
                    .orElseThrow(() -> new Exception("Customer is not exist"));
        }

        boolean authenticated = false;
        if (checkPermission) {
            authenticated = passwordEncoder.matches(request.getPassword(),
                    staff.getAccount().getPassword());
        } else {
            authenticated = passwordEncoder.matches(request.getPassword(),
                    customer.getAccount().getPassword());
        }

        if (!authenticated) {
            throw new Exception("Wrong username or password");
        }

        String token = generateToken(account,
                (checkPermission) ? staff.getStaffId() : customer.getCustomerId());

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    public String generateToken(Account account, Long userId){

        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getUsername())
                .issuer("HHH")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("userId", userId)
                .claim("scope", account.getPermission().getPermissionName())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public IntrospectResponse introspect(IntrospectRequest request)
            throws JOSEException, ParseException {
        String token = request.getToken();

        JWSVerifier jwsVerifier = new MACVerifier(SIGNER_KEY);

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiredTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean verified = signedJWT.verify(jwsVerifier);

        return IntrospectResponse.builder()
                .valid(verified && expiredTime.after(new Date()))
                .build();

    }
}
