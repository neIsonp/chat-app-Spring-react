package com.nelson.chatweb.service;

import java.util.List;

import com.nelson.chatweb.exception.ChatException;
import com.nelson.chatweb.exception.MessageException;
import com.nelson.chatweb.exception.UserException;
import com.nelson.chatweb.model.Message;
import com.nelson.chatweb.model.User;
import com.nelson.chatweb.request.SendMessageRequest;

public interface MessageService {

  public Message sendMessage(SendMessageRequest req) throws UserException, ChatException;

  public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException;

  public Message findMessageById(Integer messageId) throws MessageException;

  public void deleteMessage(Integer messageId, User reqUser) throws MessageException, UserException;

   
}
