package com.btl.btl.repositories;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.btl.btl.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	List<User> findByUsername(String username);
	  
	@Query(value="SELECT u FROM User u where u.username = ?1 and u.password = ?2")
	List<User> findByUsernameAndPassword(String username, String password);
}