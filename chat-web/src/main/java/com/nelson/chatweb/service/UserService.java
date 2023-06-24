package com.nelson.chatweb.service;

import java.util.List;

import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.request.UpdateUserRequest;

public interface UserService {

  public User findUserById(Integer id);

  public User findUserProfile(String jwt);

  public User updateUser(Integer userId, UpdateUserRequest req) throws UserException;

  public List<User> searchUser(String query);

  
}
