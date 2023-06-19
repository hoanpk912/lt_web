//package com.btl.btl.security;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.btl.btl.models.User;
//import com.btl.btl.repositories.UserRepository;
//
//@Service
//public class MyUserDetailsService implements UserDetailsService {
//	@Autowired
//	private UserRepository userRepository;
//
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		// TODO Auto-generated method stub
//		User user = userRepository.findByUsername(username).orElseThrow(
//				() -> new UsernameNotFoundException("User not found"));
////		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthorities(user) );
//		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>() );
//	}
//	public Collection<? extends GrantedAuthority> getAuthorities(User user) {
//        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
//
//        list.add(new SimpleGrantedAuthority(user.getRole()));
//
//        return list;
//    }
//	
//
//}
