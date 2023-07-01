package com.nelson.chatweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.web.server.ServerHttpSecurity.HttpsRedirectSpec;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nelson.chatweb.exception.ChatException;
import com.nelson.chatweb.exception.MessageException;
import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.Message;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.request.SendMessageRequest;
import com.nelson.chatweb.response.ApiResponse;
import com.nelson.chatweb.service.MessageService;
import com.nelson.chatweb.service.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

  private UserService userService;

  private MessageService messageService;

  public MessageController(UserService userService, MessageService messageService){
    this.userService = userService;
    this.messageService = messageService;
  }

  @PostMapping("/create")
  public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ChatException{
    
    User user = userService.findUserProfile(jwt);
    req.setUserId(user.getId());
    Message message = messageService.sendMessage(req);

    return new ResponseEntity<Message>(message, HttpStatus.OK);
  }

  @GetMapping("/chat/{chatId}")
  public ResponseEntity<List<Message>> getChatsMessagesHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException{
    
    User user = userService.findUserProfile(jwt);

    List<Message> messages = messageService.getChatsMessages(chatId, user);

    return new ResponseEntity<List<Message>>(messages, HttpStatus.OK);
  }

  @DeleteMapping("/{messageId}}")
  public ResponseEntity<ApiResponse> deleteMessagesHandler(@PathVariable Integer messageId, @RequestHeader("Authorization") String jwt) throws UserException, MessageException{
    
    User user = userService.findUserProfile(jwt);

    messageService.deleteMessage(messageId, user);

    ApiResponse res = new ApiResponse("message deleted successfully", false);


    return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
  }
  
}
