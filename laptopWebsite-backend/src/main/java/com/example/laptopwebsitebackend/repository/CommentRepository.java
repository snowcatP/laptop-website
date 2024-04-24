package com.example.laptopwebsitebackend.repository;

import com.example.laptopwebsitebackend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByProduct_ProductId(Long product_id);
}
