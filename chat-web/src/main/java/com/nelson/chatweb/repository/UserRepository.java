package com.nelson.chatweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nelson.chatweb.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

  public User findByEmail(String email);
  
}
