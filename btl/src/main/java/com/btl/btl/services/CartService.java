package com.btl.btl.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btl.btl.models.Book;
import com.btl.btl.models.Cart;
import com.btl.btl.models.User;
import com.btl.btl.repositories.CartRepositoty;

@Service
public class CartService {
	@Autowired
	private CartRepositoty cartRepositoty;
	
	@Autowired
	private UserService userService;
	
	public List<Cart> getListCart(int id) {
		User user = userService.getUserById(id);
		return cartRepositoty.findByUser(user);
	}
	
	public void addBook(Book book, int id, int quantity) {
		Cart cart = new Cart();
		User user = userService.getUserById(id);
		cart.setBook(book);
		cart.setUser(user);
		cart.setQuantity(id);
		cartRepositoty.save(cart);
	}

}
