package com.nelson.chatweb.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

  @GetMapping("/")
  public ResponseEntity<String> HomeController(){
    return new ResponseEntity<String>("Bem vindo ao nosso chat usando spring boot", HttpStatus.OK);
  }
  
}
