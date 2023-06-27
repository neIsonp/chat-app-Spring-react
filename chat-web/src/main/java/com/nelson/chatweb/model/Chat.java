package com.nelson.chatweb.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Objects;

@Entity
public class Chat {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private String chat_name;
  private String chat_image;

  @JoinColumn(name = "is_group")
  private boolean isGroup;

  @JoinColumn(name = "created_by")
  @ManyToOne
  private User createdBy;

  @ManyToMany
  private Set<User> users = new HashSet<>();

  @OneToMany
  private List<Message> messages = new ArrayList<>();

  public Chat() {
  }

  public Chat(Integer id, String chat_name, String chat_image, boolean isGroup, User createdBy, Set<User> users, List<Message> messages) {
    this.id = id;
    this.chat_name = chat_name;
    this.chat_image = chat_image;
    this.isGroup = isGroup;
    this.createdBy = createdBy;
    this.users = users;
    this.messages = messages;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getChat_name() {
    return this.chat_name;
  }

  public void setChat_name(String chat_name) {
    this.chat_name = chat_name;
  }

  public String getChat_image() {
    return this.chat_image;
  }

  public void setChat_image(String chat_image) {
    this.chat_image = chat_image;
  }

  public boolean isIsGroup() {
    return this.isGroup;
  }

  public boolean getIsGroup() {
    return this.isGroup;
  }

  public void setIsGroup(boolean isGroup) {
    this.isGroup = isGroup;
  }

  public User getcreatedBy() {
    return this.createdBy;
  }

  public void setcreatedBy(User createdBy) {
    this.createdBy = createdBy;
  }

  public Set<User> getUsers() {
    return this.users;
  }

  public void setUsers(Set<User> users) {
    this.users = users;
  }

  public List<Message> getMessages() {
    return this.messages;
  }

  public void setMessages(List<Message> messages) {
    this.messages = messages;
  }
}