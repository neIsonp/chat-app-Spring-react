package com.nelson.chatweb.config;

import java.util.Arrays;
import java.util.Collections;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class AppConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          .and().authorizeRequests(authorize -> authorize
              .antMatchers("/api/**").authenticated()
              .anyRequest().permitAll())
          .addFilterBefore(new JwtTokenValitador(), BasicAuthenticationFilter.class)
          .csrf().disable()
          .cors().configurationSource(new CorsConfigurationSource() {
              @Override
              public CorsConfiguration getCorsConfiguration(HttpServletRequest http) {

                  CorsConfiguration cfg = new CorsConfiguration();

                  cfg.setAllowedOrigins(Arrays.asList(
                    "http://localhost:3000"
                  ));

                  cfg.setAllowedMethods(Collections.singletonList("*"));
                  cfg.setAllowCredentials(true);
                  cfg.setAllowedHeaders(Collections.singletonList("*"));
                  cfg.setExposedHeaders(Arrays.asList("Authorization"));
                  cfg.setMaxAge(3600L);

                  return cfg;
              }
          }).and().formLogin().and().httpBasic();

      return http.build();
  }
  
  @Bean
  public PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
  }
}