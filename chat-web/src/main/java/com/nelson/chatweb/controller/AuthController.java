package com.nelson.chatweb.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nelson.chatweb.config.TokenProvider;
import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.repository.UserRepository;
import com.nelson.chatweb.request.LoginRequest;
import com.nelson.chatweb.response.AuthResponse;
import com.nelson.chatweb.service.CustomUserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
  
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;
  private TokenProvider tokenProvider;
  private CustomUserService customUserService;
  
  public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider,CustomUserService customUserService){
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.tokenProvider = tokenProvider;
    this.customUserService = customUserService;
  }

  @PostMapping("/signup")
  public ResponseEntity<Map<String, Object>> createUserHandler(@RequestBody User user) throws UserException{
    String full_name = user.getFull_name();
    String email = user.getEmail();
    String password = user.getPassword();

    System.out.println("ESTE É O OBEJTO RECEBIDO" + user);

    User isUser = userRepository.findByEmail(email);

    if(isUser != null){
      throw new UserException("Email is user with another account " + email);
    }

    User createdUser = new User();
    createdUser.setEmail(email);
    createdUser.setFull_name(full_name);
    createdUser.setPassword(passwordEncoder.encode(password));

    userRepository.save(createdUser);

    Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);

    System.out.println("ESTE SUPOSTAMENTE É O TOKEN" + jwt);

    Map<String, Object> response = new HashMap<>();
    response.put("jwt", jwt);
    response.put("status", true);

    return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

  }

  @PostMapping("/signin")
  public ResponseEntity<Map<String, Object>> loginHandler(@RequestBody LoginRequest req){
    String email = req.getEmail();
    String password = req.getPassword();

    Authentication authentication = authenticate(email, password);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);

    Map<String, Object> response = new HashMap<>();
    response.put("jwt", jwt);
    response.put("status", true);

    return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
  }

  public Authentication authenticate(String username, String password){
    UserDetails userDetails = customUserService.loadUserByUsername(username);

    if(userDetails == null){
      throw new BadCredentialsException("Invalid username");
    }

    if(!passwordEncoder.matches(password, userDetails.getPassword())){
      throw new BadCredentialsException("Invalid username or password");
    }
    
    return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
  }
}