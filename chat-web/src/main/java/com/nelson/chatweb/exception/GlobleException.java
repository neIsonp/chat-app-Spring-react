package com.nelson.chatweb.exception;


import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.web.server.ServerHttpSecurity.HttpsRedirectSpec;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobleException {

  @ExceptionHandler(UserException.class)
  public ResponseEntity<ErrorDetail> UserExceptionHandler(UserException e, WebRequest req){

    ErrorDetail err = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());

    return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);

  }

  @ExceptionHandler(MessageException.class)
  public ResponseEntity<ErrorDetail> MessageExceptionHandler(MessageException e, WebRequest req){

    ErrorDetail err = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());

    return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);

  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorDetail> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e, WebRequest req){

    String error = e.getBindingResult().getFieldError().getDefaultMessage();

    ErrorDetail err = new ErrorDetail("validation error", error, LocalDateTime.now());

    return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
  }

   @ExceptionHandler(NoHandlerFoundException.class)
  public ResponseEntity<ErrorDetail> handleNoHandlerFoundException(MethodArgumentNotValidException e, WebRequest req){

    ErrorDetail err = new ErrorDetail("endpoint not found", e.getMessage(), LocalDateTime.now());

    return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
  }
  
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorDetail> OtherxceptionHandler(Exception e, WebRequest req){

    ErrorDetail err = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());

    return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);

  }
  
}
