package com.nelson.chatweb.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;
  private String content;

  private LocalDateTime timestamp;

  @ManyToOne
  private User user;

  @ManyToOne
  @JoinColumn(name = "chat_id")
  private Chat chat;

  public Message(){

  }

  public Message(Integer id, String content, LocalDateTime timestamp, User user, Chat chat){
    super();
    this.id = id;
    this.content = content;
    this.timestamp = timestamp;
    this.user = user;
    this.chat = chat;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getContent() {
    return this.content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public LocalDateTime getTimestamp() {
    return this.timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Chat getChat() {
    return this.chat;
  }

  public void setChat(Chat chat) {
    this.chat = chat;
  }

  
}
