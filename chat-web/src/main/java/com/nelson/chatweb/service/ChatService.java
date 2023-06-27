package com.nelson.chatweb.service;

import java.util.List;

import com.nelson.chatweb.exception.ChatException;
import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.Chat;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.request.GroupChatRequest;

public interface ChatService {

  public Chat createChat(User reqUser, Integer userId2) throws UserException;

  public Chat findChatById(Integer chatId) throws ChatException;

  public List<Chat> findAllChatByUserId(Integer userId) throws UserException;

  public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException;

  public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser)  throws UserException, ChatException;

  public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException;

  public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;
 
  public Chat deleteChat(Integer chatId, Integer userId) throws ChatException, UserException;
  
}