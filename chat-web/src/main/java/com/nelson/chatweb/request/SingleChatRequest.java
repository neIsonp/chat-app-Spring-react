package com.nelson.chatweb.request;

public class SingleChatRequest {

  private Integer userId;
  
  public SingleChatRequest(Integer userId){
    super();
    this.userId = userId;
  }


  public Integer getUserId() {
    return this.userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  
}
