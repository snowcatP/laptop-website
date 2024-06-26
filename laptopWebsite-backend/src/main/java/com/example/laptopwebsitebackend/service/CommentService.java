package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Comment;
import com.example.laptopwebsitebackend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getListAllComment(){

        return commentRepository.findAll();
    }

    public void addNewComment(Comment comment){
        if(comment.getContent() == null) {
            throw new IllegalArgumentException("There is no commented content");
        }
        commentRepository.save(comment);
    }

    public void deleteComment(Long comment_id){
        commentRepository.deleteById(comment_id);
    }

    public Comment updateComment(Comment comment, Long comment_id){
        Comment dbComment = this.commentRepository.findById(comment_id).
                orElseThrow(() -> new RuntimeException("Could not find request"));

        if(comment.getContent() != null && !Objects.equals(dbComment.getContent(),comment.getContent())){
            dbComment.setContent(comment.getContent());
        }
        return commentRepository.save(dbComment);
    }

    public Comment findComment(Long comment_id){
        Comment comment = commentRepository.findById(comment_id)
                .orElseThrow(() -> new RuntimeException("Comment is not exist with given id: " + comment_id));

        return comment;
    }

    public List<Comment> getListCommentByProductID(Long product_id){
        return commentRepository.findByProduct_ProductId(product_id);
    }
}
