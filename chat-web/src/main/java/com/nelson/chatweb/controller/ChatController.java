package com.nelson.chatweb.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
import com.nelson.chatweb.response.ApiResponse;
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
  public ResponseEntity<Chat> createChatHandler(@RequestBody Map<String, Integer> requestBody, @RequestHeader("Authorization") String jwt) throws UserException {

      Integer userId = requestBody.get("userId");
      System.out.println("Received user ID: " + userId);
      System.out.println("recebendo isso aqui" + requestBody);

      User reqUser = userService.findUserProfile(jwt);
      Chat chat = chatService.createChat(reqUser, userId);

      return new ResponseEntity<>(chat, HttpStatus.OK);

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

  @GetMapping("/user")
  public ResponseEntity<List<Chat>> findAllChatByUserIdHandler(@RequestHeader("Authorization") String jwt) throws UserException{

    User reqUser = userService.findUserProfile(jwt);

    List<Chat> chats = chatService.findAllChatByUserId(reqUser.getId());

    return new ResponseEntity<List<Chat>>(chats, HttpStatus.OK);

  }

  @PutMapping("/{chatId}/add/{userId}")
  public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException{

    User reqUser = userService.findUserProfile(jwt);

    Chat chat = chatService.addUserToGroup(userId, chatId, reqUser);

    return new ResponseEntity<Chat>(chat, HttpStatus.OK);

  }

  @PutMapping("/{chatId}/remove/{userId}")
  public ResponseEntity<Chat> removeUserFromGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException{

    User reqUser = userService.findUserProfile(jwt);

    Chat chat = chatService.removeFromGroup(chatId, userId, reqUser);

    return new ResponseEntity<Chat>(chat, HttpStatus.OK);

  }

  @DeleteMapping("/delete/{chatId}")
  public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException{

    User reqUser = userService.findUserProfile(jwt);

    chatService.deleteChat(chatId, reqUser.getId());

    ApiResponse res = new ApiResponse("Chat is deleted successfully", true);

    return new ResponseEntity<>(res, HttpStatus.OK);

  }

}
