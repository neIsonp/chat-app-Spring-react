package com.nelson.chatweb.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nelson.chatweb.exception.ChatException;
import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.Chat;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.request.GroupChatRequest;
import com.nelson.chatweb.request.SingleChatRequest;
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

  @PostMapping("/single")
  public ResponseEntity<Chat> createChatHandler(@RequestBody SingleChatRequest singleChatRequest, @RequestHeader("Authorization") String jwt) throws UserException{

    User reqUser = userService.findUserProfile(jwt);

    Chat chat = chatService.createChat(reqUser, singleChatRequest.getUserId());

    return new ResponseEntity<Chat>(chat,HttpStatus.OK);

  }

  @PostMapping("/group")
  public ResponseEntity<Chat> createGroupHandler(@RequestBody GroupChatRequest req, @RequestHeader("Authorization") String jwt) throws UserException{

    User reqUser = userService.findUserProfile(jwt);

    Chat chat = chatService.createGroup(req, reqUser);

    return new ResponseEntity<Chat>(chat,HttpStatus.OK);

  }

  @GetMapping("/{chatId}")
  public ResponseEntity<Chat> findChatByIdHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException{
    Chat chat = chatService.findChatById(chatId);

    return new ResponseEntity<Chat>(chat,HttpStatus.OK);
  }

}
