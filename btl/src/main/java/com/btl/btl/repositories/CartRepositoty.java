package com.btl.btl.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.btl.btl.models.Cart;
import com.btl.btl.models.User;

@Repository
public interface CartRepositoty extends JpaRepository<Cart, Integer> {
	
	public List<Cart> findByUser(User user);
	
}
