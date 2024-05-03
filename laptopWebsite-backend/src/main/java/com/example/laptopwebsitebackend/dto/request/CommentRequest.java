package com.example.laptopwebsitebackend.dto.request;

import com.example.laptopwebsitebackend.entity.Customer;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequest {
    private String content;

    @Temporal(TemporalType.DATE)
    private Date commentDate;

    private Long customer_id;

    private Long product_id;

}
