package com.crashpad.springjwt.dto;

import lombok.Data;

@Data
public class TravelerFormDTO {
    private String firstName;
    private String lastName;
    private int age;
    private String gender;
    private String phone;
    private String email;
    private String description;
}