package com.example.laptopwebsitebackend.controller;

import com.example.laptopwebsitebackend.entity.Cart;
import com.example.laptopwebsitebackend.entity.CartDetails;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.service.CartDetailService;
import com.example.laptopwebsitebackend.service.CartService;
import com.example.laptopwebsitebackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartDetailService cartDetailService;
    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @GetMapping("/cart-details/{id}")
    public ResponseEntity<List<CartDetails>> getAllCartDetails(@PathVariable("id") Long id) {
        return new ResponseEntity<>(cartDetailService.getAllCartDetailsByCartId(id), HttpStatus.OK);
    }

    @PostMapping("/add-item-to-cart/{cartId}/{productId}/{quantity}")
    public ResponseEntity<CartDetails> addItemToCart(@PathVariable("cartId") Long cartId, @PathVariable("productId") Long productId,
                                                @PathVariable("quantity") int quantity ){
        Product product = productService.findProductByID(productId);
        Cart cart = cartService.findCartById(cartId);

        CartDetails cartDetails = new CartDetails();
        cartDetails.setProduct(product);
        cartDetails.setCart(cart);
        cartDetails.setQuantity(quantity);

        //Calculate the total price of this item
        int discountValue = (product.getDiscount()!=null) ? product.getDiscount().getDiscountValue() : 0;
        double costPrice = product.getPrice();
        Locale localeVN = new Locale("vi", "VN");
        NumberFormat currencyVN = NumberFormat.getCurrencyInstance(localeVN);
        Double totalPrice = costPrice*quantity;
        String totalPriceStr = currencyVN.format(totalPrice-(totalPrice*discountValue/100));
        cartDetails.setTotalPrice(totalPriceStr);

        //Update the availibility quantity of this product
        product.setQuantity(product.getQuantity()-quantity);


        return new ResponseEntity<>(cartDetailService.addItemToCart(cartDetails),HttpStatus.OK);
    }

    @PostMapping("/delete-item-to-cart/{cartDetailsId}")
    public ResponseEntity<String> deleteItemtoCart(@PathVariable("cartDetailsId") Long cartDetailsId){
        CartDetails cartDetails = cartDetailService.findById(cartDetailsId);
        Product product = cartDetails.getProduct();

        //Update the availibility quantity of this product
        int quantity = cartDetails.getQuantity();
        product.setQuantity(product.getQuantity()+quantity);

        return ResponseEntity.ok(cartDetailService.deleteById(cartDetailsId));
    }
    @PostMapping("/edit-item-in-cart/{cartDetailsId}/{new_quantity}")
    public ResponseEntity<CartDetails> updateItemtoCart(@PathVariable("cartDetailsId") Long cartDetailsId,@PathVariable("new_quantity") int new_quantity){
        CartDetails cartDetails = cartDetailService.findById(cartDetailsId);
        Product product = cartDetails.getProduct();

        int quantity = cartDetails.getQuantity();
        cartDetails.setQuantity(new_quantity);

        //Update the total price of this item
        int discountValue = (product.getDiscount()!=null) ? product.getDiscount().getDiscountValue() : 0;
        double costPrice = product.getPrice();
        Locale localeVN = new Locale("vi", "VN");
        NumberFormat currencyVN = NumberFormat.getCurrencyInstance(localeVN);
        Double totalPrice = costPrice*new_quantity;
        String totalPriceStr = currencyVN.format(totalPrice-(totalPrice*discountValue/100));
        cartDetails.setTotalPrice(totalPriceStr);

        //Update the availibility quantity of this product
        product.setQuantity(product.getQuantity()-(new_quantity-quantity));

        return new ResponseEntity<>(cartDetailService.updateItemInCart(cartDetails), HttpStatus.OK);
    }


}
