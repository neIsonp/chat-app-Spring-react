package com.nelson.chatweb.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider {

  SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

  public String generateToken(Authentication authentication){
    String jwt = Jwts.builder().setIssuer("Nelson here")
    .setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + 86400000))
    .claim("email", authentication.getUsername())
    .signWith(key)
    .compact();

    return jwt;
  }
  
}
