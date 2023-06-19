package com.btl.btl.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btl.btl.models.User;
import com.btl.btl.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public void addUser(User user) {
		user.setRole("ROLE_USER");
		userRepository.save(user);
	}
	
	public User getUserById(int id) {
		return userRepository.findById(id).get();
	}
	
	public boolean getUserByUsername(String username) {
		try {
			userRepository.findByUsername(username).get(0);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public User getUserByUsernameAndPassword(String username, String password) {
		return userRepository.findByUsernameAndPassword(username, password).get(0);
	}
}
