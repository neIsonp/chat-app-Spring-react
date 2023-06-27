package com.nelson.chatweb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nelson.chatweb.service.ChatService;
import com.nelson.chatweb.service.UserService;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

  private ChatService chatService;
  private UserService userService;

  public ChatController(ChatService chatService, UserService userService){
    this.chatService = chatService;
    this.userService = userService;
  }
  
}
