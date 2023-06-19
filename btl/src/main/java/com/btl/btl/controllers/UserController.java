package com.btl.btl.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.btl.btl.models.User;
import com.btl.btl.services.UserService;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/login")
	public User getUserByUsernameAndPassword(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password){
		try {
			User user = userService.getUserByUsernameAndPassword(username, password);
			return user;
		} catch (Exception e) {
//			User user = new User();
//			user.setUsername(null);
//			user.setPassword(null);
//			user.setRole(null);
//			return user;
		}
		return null;
		
	}
	@PostMapping("/register")
	public boolean register(@RequestBody User user){
		if(userService.getUserByUsername(user.getUsername()))
			return false;
		else {
			userService.addUser(user);
		}
		return true;
	}
}
