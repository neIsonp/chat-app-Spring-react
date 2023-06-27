package com.nelson.chatweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nelson.chatweb.exception.ChatException;
import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.Chat;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.repository.ChatRepository;
import com.nelson.chatweb.request.GroupChatRequest;

@Service
public class ChatServiceImplementation implements ChatService {


  private ChatRepository chatRepository;
  private UserService userService;

  public ChatServiceImplementation(ChatRepository chatRepository, UserService userService){
    this.chatRepository = chatRepository;
    this.userService = userService; 
  }

  @Override
  public Chat createChat(User reqUser, Integer userId2) throws UserException {

    User user = userService.findUserById(userId2);
    
    Chat isChatExist = chatRepository.findSingleChatByUsersIds(user, reqUser);

    if(isChatExist != null){
      return isChatExist;
    }

    Chat chat = new Chat();
    chat.setcreatedBy(reqUser);
    chat.getUsers().add(user);
    chat.getUsers().add(reqUser);
    chat.setIsGroup(false);
     
    return chat;
  }

  @Override
  public Chat findChatById(Integer chatId) throws ChatException {
    
    return null;
  }

  @Override
  public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'findAllChatByUserId'");
  }

  @Override
  public Chat createGroup(GroupChatRequest req, Integer reqUserId) throws UserException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'createGroup'");
  }

  @Override
  public Chat addUserToGroup(Integer userId, Integer chatId) throws UserException, ChatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'addUserToGroup'");
  }

  @Override
  public Chat renameGroup(Integer chatId, String groupName, Integer reqUserId) throws ChatException, UserException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'renameGroup'");
  }

  @Override
  public Chat removeFromGroup(Integer chatId, Integer userId, Integer reqUser) throws UserException, ChatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'removeFromGroup'");
  }

  @Override
  public Chat deleteChat(Integer chatId, Integer userId) throws ChatException, UserException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteChat'");
  }

 

}
