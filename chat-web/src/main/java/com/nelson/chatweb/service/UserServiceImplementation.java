package com.nelson.chatweb.service;

import java.util.List;
import java.util.Optional;

import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.repository.UserRepository;
import com.nelson.chatweb.request.UpdateUserRequest;

public class UserServiceImplementation implements UserService{


  private UserRepository userRepository;

  public UserServiceImplementation(UserRepository userRepository){
    this.userRepository = userRepository;
  }

  @Override
  public User findUserById(Integer id) throws UserException {
    Optional<User> opt= userRepository.findById(id);

    if(opt.isPresent()){
      return opt.get();
    }

    throw new UserException("user not found with id + "+  id);
  }

  @Override
  public User findUserProfile(String jwt) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'findUserProfile'");
  }

  @Override
  public User updateUser(Integer userId, UpdateUserRequest req) throws UserException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
  }

  @Override
  public List<User> searchUser(String query) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'searchUser'");
  }
  
}
