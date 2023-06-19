package com.btl.btl.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.btl.btl.models.Book;
import com.btl.btl.models.Cart;
import com.btl.btl.models.User;
import com.btl.btl.services.CartService;
import com.btl.btl.services.UserService;

@RestController
@CrossOrigin
public class CartController {
	@Autowired
	private CartService cartService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/cart")
	public List<Cart> getCartByUser(@RequestParam(value = "id") int id) {
		List<Cart> carts = cartService.getListCart(id);
		return carts;
	}
//	@PostMapping("/cart/add")
//	public void addToCart(@RequestParam) {
////		System.out.println(books);
//		for(Book book: books) {
//			cartService.addBook(book, 1, book.)
//		}
//	}
	
}
