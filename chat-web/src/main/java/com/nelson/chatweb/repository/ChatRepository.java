package com.nelson.chatweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nelson.chatweb.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
  
}
