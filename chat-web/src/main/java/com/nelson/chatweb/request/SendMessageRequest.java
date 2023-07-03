package com.nelson.chatweb.request;

public class SendMessageRequest {

  private Integer userId;
  private Integer chatId;
  private String content;

  public SendMessageRequest(){

  }

  public SendMessageRequest(Integer userId, Integer chatId, String content){
    super();
    this.userId = userId;
    this.chatId = chatId;
    this.content = content;

  }

  public Integer getUserId() {
    return this.userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public Integer getChatId() {
    return this.chatId;
  }

  public void setChatId(Integer chatId) {
    this.chatId = chatId;
  }

  public String getContent() {
    return this.content;
  }

  public void setContent(String content) {
    this.content = content;
  }
  
}
