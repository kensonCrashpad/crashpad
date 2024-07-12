package com.crashpad.springjwt.dto;

import lombok.Data;
import java.util.Set;

@Data
public class UserProfileDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
    private String phone;
    private String gender;
    private int age;
    private String description;
    private String paymentType;
    private Long addressId;
    private String profileImage;
    private Set<Long> bookingIds;
    private Set<Long> reviewIds;
    private Set<Long> vehicleIds;
    private Set<Long> favoriteIds;
    private Set<Long> paymentIds;
    private Long userId;

    public UserProfileDTO() {
    }

    public UserProfileDTO(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
