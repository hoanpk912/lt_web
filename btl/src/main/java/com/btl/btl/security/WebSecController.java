//package com.btl.btl.security;
//
//
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.btl.btl.models.User;
//import com.btl.btl.repositories.UserRepository;
//
//@RestController
//@CrossOrigin
//public class WebSecController {
//	
//	@Autowired
//	private UserRepository userRepository;
//	
//	@Autowired
//	private AuthenticationManager authenticationManager;
//	
////	private MyUserDetailsService detailsService;
////	
////	@Autowired
////	PasswordEncoder encoderPassword;
//	
//	@GetMapping("/home")
//	@PreAuthorize("hasRole('USER')")
//	public String showHomePage () {
//		return "home";
//	}
//	
//	@GetMapping("/admin")
//	@PreAuthorize("hasRole('ADMIN')")
//	public String protectedPage () {
//		return "admin";
//	}
//	
//	@PostMapping("/login")
//	public ResponseEntity<HttpStatus> login(@RequestBody User user) throws Exception {
//		Authentication authentication;
//		try {
//			authentication = authenticationManager.authenticate(
//					new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
//			SecurityContextHolder.getContext().setAuthentication(authentication);
//			
//		} catch(BadCredentialsException e) {
//			throw new Exception("Invalid credentials");
//		}
//
//		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
//	}
//	@GetMapping("/logout")
//	public ResponseEntity<HttpStatus> logout() throws Exception {
//		SecurityContextHolder.getContext().setAuthentication(null);
//		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
//	}
//
//}
