package com.nelson.chatweb.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.web.server.ServerHttpSecurity.HttpsRedirectSpec;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.repository.UserRepository;
import com.nelson.chatweb.request.UpdateUserRequest;
import com.nelson.chatweb.response.ApiResponse;
import com.nelson.chatweb.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private UserService userService;

  public UserController(UserService userService){
    this.userService = userService;
  }

  @GetMapping("/profile")
  public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException{

    User user = userService.findUserProfile(token);

    return new ResponseEntity<User>(user,HttpStatus.ACCEPTED);
  }

  @GetMapping("/{query}")
  public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String query) {

    List<User> users = userService.searchUser(query);

    return new ResponseEntity<List<User>>(users,HttpStatus.OK);
  }

  @PutMapping("/update")
  public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest req, @RequestHeader("Authorization") String token) throws UserException{

    User user = userService.findUserProfile(token);

    userService.updateUser(user.getId(), req);

    ApiResponse res = new ApiResponse("User updated successfully", true);

    return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
  }
  
}