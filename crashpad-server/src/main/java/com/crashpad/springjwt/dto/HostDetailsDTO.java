package com.crashpad.springjwt.dto;

import lombok.Data;

@Data
public class HostDetailsDTO {
    private Long userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String gender;
    private int age;
    private String description;
}
