package com.example.order_service.controller;

import com.example.order_service.entity.Cart;
import com.example.order_service.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @GetMapping("/{id}")
    public Cart getCartById(@PathVariable int id) {
        return cartService.getCartById(id).orElse(null);
    }

    @PostMapping
    public Cart addCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }

    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable int id) {
        cartService.deleteCart(id);
    }

    @GetMapping("/user/{userId}")
    public List<Cart> getCartByUserId(@PathVariable int userId) {
        return cartService.getCartByUserId(userId);
    }

}
