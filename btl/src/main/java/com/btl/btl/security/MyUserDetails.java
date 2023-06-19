//package com.btl.btl.security;
//
//import java.util.*;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import com.btl.btl.models.Role;
//import com.btl.btl.models.User;
// 
//@SuppressWarnings("serial")
//public class MyUserDetails implements UserDetails {
// 
//    private User user;
//     
//    public MyUserDetails(User user) {
//        this.user = user;
//    }
// 
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
//
//        list.add(new SimpleGrantedAuthority(user.getRole()));
//
//        return list;
//    }
// 
//    @Override
//    public String getPassword() {
//        return user.getPassword();
//    }
// 
//    @Override
//    public String getUsername() {
//        return user.getUsername();
//    }
// 
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
// 
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
// 
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return false;
//    }
//  
//}