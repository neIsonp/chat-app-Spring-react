package com.nelson.chatweb.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String full_name;
    private String email;
    private String profile_picture;
    private String password;

    public User() {
    }

    public User(Integer id,String full_name, String email, String profile_picture, String password) {
        super();
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.profile_picture = profile_picture;
        this.password = password;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFull_name() {
        return this.full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfile_picture() {
        return this.profile_picture;
    }

    public void setProfile_picture(String profile_picture) {
        this.profile_picture = profile_picture;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(full_name, user.full_name) 
            && Objects.equals(email, user.email) && Objects.equals(profile_picture, user.profile_picture) 
            && Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, full_name, email, profile_picture, password);
    }
 
    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", full_name='" + getFull_name() + "'" +
            ", email='" + getEmail() + "'" +
            ", profile_picture='" + getProfile_picture() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }

    
}

