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
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins="*")
public class CartController {
    @Autowired
    private CartDetailService cartDetailService;
    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @GetMapping("/{id}")
    public ResponseEntity<List<CartDetails>> getAllCartDetails(@PathVariable("id") Long id) {
        return new ResponseEntity<>(cartDetailService.getAllCartDetailsByCartId(id), HttpStatus.OK);
    }

    @PostMapping("/add-to-cart/{cartId}/{productId}/{quantity}")
    public ResponseEntity<CartDetails> addItemToCart(@PathVariable("cartId") Long cartId, @PathVariable("productId") Long productId,
                                                     @PathVariable("quantity") int quantity ){
        Product product = productService.findProductByID(productId);
        Cart cart = cartService.findCartById(cartId);
        CartDetails cartDetails = new CartDetails();

            if (quantity <= product.getQuantity()) {
                for (CartDetails cartDetails2 : cart.getCartDetails()) {
                    if (cartDetails2.getQuantity()<10){
                        if (cartDetails2.getProduct().getProductId().equals(productId)) {
                            cartDetails2.setQuantity(cartDetails2.getQuantity() + quantity);
                            cartDetails2.setPrice(calculateTotalPrice(product, cartDetails2.getQuantity()));
                            return new ResponseEntity<>(cartDetailService.updateItemInCart(cartDetails2), HttpStatus.OK);
                        }
                    }
                    return new ResponseEntity<>(cartDetailService.addItemToCart(cartDetails), HttpStatus.EXPECTATION_FAILED);

                }
                List<CartDetails> lstCartDetails = new ArrayList<>();
                cartDetails.setProduct(product);
                cartDetails.setQuantity(quantity);
                cartDetails.setCart(cart);

                cartDetails.setPrice(calculateTotalPrice(product, quantity));

                lstCartDetails.add(cartDetails);
                cart.setCartDetails(lstCartDetails);
                return new ResponseEntity<>(cartDetailService.addItemToCart(cartDetails), HttpStatus.OK);
            }
        else {return new ResponseEntity<>(cartDetailService.addItemToCart(cartDetails), HttpStatus.EXPECTATION_FAILED);}

    }

    public Double calculateTotalPrice(Product product, int quantity){
        int discountValue = (product.getDiscount() != null) ? product.getDiscount().getDiscountValue() : 0;
        double costPrice = product.getPrice();
        Double Price = costPrice * quantity;
        Price = Price - (Price * discountValue / 100);
        return Price;
    }
    @PostMapping("/delete-to-cart/{cartDetailsId}")
    public ResponseEntity<String> deleteItemtoCart(@PathVariable("cartDetailsId") Long cartDetailsId){
        CartDetails cartDetails = cartDetailService.findById(cartDetailsId);
        Product product = cartDetails.getProduct();

        //Update the availibility quantity of this product
        int quantity = cartDetails.getQuantity();

        return ResponseEntity.ok(cartDetailService.deleteById(cartDetailsId));
    }
    @PostMapping("/edit-item-in-cart/{cartDetailsId}/{new_quantity}")
    public ResponseEntity<CartDetails> updateItemtoCart(@PathVariable("cartDetailsId") Long cartDetailsId,@PathVariable("new_quantity") int new_quantity){

        CartDetails cartDetails = cartDetailService.findById(cartDetailsId);
        Product product = cartDetails.getProduct();

        if(new_quantity==0){
            deleteItemtoCart(cartDetailsId);
        }
        else {
            int quantity = cartDetails.getQuantity();
            cartDetails.setQuantity(new_quantity);

            //Update the total price of this item
            int discountValue = (product.getDiscount()!=null) ? product.getDiscount().getDiscountValue() : 0;
            double costPrice = product.getPrice();
            Double Price = costPrice*new_quantity;
            cartDetails.setPrice(Price-(Price*discountValue/100));

            //Update the availibility quantity of this product
            product.setQuantity(product.getQuantity()-(new_quantity-quantity));
        }

        return new ResponseEntity<>(cartDetailService.updateItemInCart(cartDetails), HttpStatus.OK);
    }


}
