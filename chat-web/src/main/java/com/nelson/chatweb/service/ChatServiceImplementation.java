package com.nelson.chatweb.service;

import java.util.List;
import java.util.Optional;

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
    Optional<Chat> chat = chatRepository.findById(chatId);

    if(chat.isPresent()){
      return chat.get();
    }

    throw new ChatException("Char not dound with id " + chatId);
  }

  @Override
  public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
    User user = userService.findUserById(userId);

    List<Chat> chats = chatRepository.findChatByUserId(user.getId());

    return chats;
  }

  @Override
  public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException {

    Chat group = new Chat();
    group.setIsGroup(true);
    group.setChat_image(req.getChat_image());
    group.setChat_name(req.getChat_name());
    group.setcreatedBy(reqUser);
    group.getAdmins().add(reqUser);

    for(Integer userId: req.getUserId()){
      User user = userService.findUserById(userId);
      group.getUsers().add(user);
    }

    return group;
  }

  @Override
  public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {
    Optional<Chat> opt = chatRepository.findById(chatId);

    User user = userService.findUserById(userId);

    if(opt.isPresent()){

      Chat chat = opt.get();

      if(chat.getAdmins().contains(reqUser)){
        chat.getUsers().add(user);
        return chat;
      }else{
        throw new UserException("You are not admin");
      }
    }

    throw new ChatException("Chat not found with id" + chatId);

  }

  @Override
  public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException {
     Optional<Chat> opt = chatRepository.findById(chatId);

     if(opt.isPresent()){
      Chat chat = opt.get();
      if(chat.getUsers().contains(reqUser)){
        chat.setChat_name(groupName);
        return chatRepository.save(chat);
      }
        throw new UserException("You aren't not member o this group");
     }

    throw new ChatException("Chat not found with id" + chatId);
  }

  @Override
  public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'removeFromGroup'");
  }

  @Override
  public Chat deleteChat(Integer chatId, Integer userId) throws ChatException, UserException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteChat'");
  }

 

}
