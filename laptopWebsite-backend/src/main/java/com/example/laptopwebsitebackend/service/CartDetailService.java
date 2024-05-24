package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.CartDetails;
import com.example.laptopwebsitebackend.repository.CartDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService {
    @Autowired
    private CartDetailsRepository cartDetailsRepository;

    public List<CartDetails> getAllCartDetailsByCartId(Long id) {
        return cartDetailsRepository.findAllByCartCartId(id);
    }

    public CartDetails addItemToCart(CartDetails cartDetails) {

        return cartDetailsRepository.save(cartDetails);
    }

    public String deleteById(Long cartDetailsId) {
        if (!cartDetailsRepository.existsById(cartDetailsId)){
            throw new RuntimeException("Can't delete cart item that does not exist");
        }else{
            cartDetailsRepository.deleteById(cartDetailsId);
            return "Delete item successfully";
        }
    }

    public CartDetails findById(Long cartDetailsId) {
        return cartDetailsRepository.findById(cartDetailsId).get();
    }

    public CartDetails updateItemInCart(CartDetails cartDetails) {
        return cartDetailsRepository.save(cartDetails);
    }
}
