package com.example.laptopwebsitebackend.controller;


import com.example.laptopwebsitebackend.dto.request.CommentRequest;
import com.example.laptopwebsitebackend.entity.Comment;
import com.example.laptopwebsitebackend.service.CommentService;
import com.example.laptopwebsitebackend.service.CustomerService;
import com.example.laptopwebsitebackend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CustomerService customerService;


    @PostMapping
    public ResponseEntity<Comment> create_New_Comment(@Valid @RequestBody CommentRequest commentRequest){

        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setCommentDate(commentRequest.getCommentDate());
        comment.setProduct(productService.findProductByID(commentRequest.getProduct_id()));
        comment.setCustomer(customerService.findCustomerById(commentRequest.getCustomer_id()));
        commentService.addNewComment(comment);

        return new ResponseEntity<>(comment, HttpStatus.OK  );
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getListAllComments(){
        List<Comment> allComment = commentService.getListAllComment();

        return new ResponseEntity<>(allComment, HttpStatus.OK);
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<List<Comment>> get_Comment_By_Product_Id(@PathVariable("product_id") Long product_Id) {
        List<Comment> allComment = commentService.getListCommentByProductID(product_Id);

        return new ResponseEntity<>(allComment, HttpStatus.OK);
    }



    @DeleteMapping("/delete/{id}")
    public void delete_comment(@PathVariable("id") Long id) {
        commentService.deleteComment(id);
    }
}
