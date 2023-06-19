//package com.btl.btl.security;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import com.btl.btl.models.User;
//import com.btl.btl.repositories.UserRepository;
//
//@Component
//public class MyAuthenticationProvider implements AuthenticationProvider {
//	
//	@Autowired
//	private UserRepository userRepository;
//	
//	@Autowired
//	private PasswordEncoder encoderPassword;
//
//	@Override
//	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//		String username = authentication.getName();
//		String password = authentication.getCredentials().toString();
//		
//		User user = userRepository.findByUsername(username).orElseThrow(
//				() -> new UsernameNotFoundException("user not found"));
//		
//		
//		if(encoderPassword.matches(password, user.getPassword())) {
//			System.out.println("provider");
//	        System.out.println(user.getRole());
//	        return new UsernamePasswordAuthenticationToken(username, password, getAuthorities(user));
//		} else {
//			throw new BadCredentialsException("user not found");
//		}
//	}
//
//	@Override
//	public boolean supports(Class<?> authentication) {
//		// TODO Auto-generated method stub
//		return authentication.equals(UsernamePasswordAuthenticationToken.class);
//	}
//	public Collection<? extends GrantedAuthority> getAuthorities(User user) {
//        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
//        list.add(new SimpleGrantedAuthority(user.getRole()));
//        return list;
//    }
//}
