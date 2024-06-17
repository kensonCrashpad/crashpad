package com.crashpad.springjwt.controllers;

import com.crashpad.springjwt.dto.UserDTO;
import com.crashpad.springjwt.dto.UserProfileDTO;
import com.crashpad.springjwt.models.User;
import com.crashpad.springjwt.models.UserProfile;
import com.crashpad.springjwt.security.services.UserProfileService;
import com.crashpad.springjwt.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/create")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        if (userService.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body(null);
        }

        if (userService.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body(null);
        }

        User user = new User(
                userDTO.getUsername(),
                userDTO.getEmail(),
                encoder.encode(userDTO.getPassword()),
                userDTO.getRole()
        );

        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(convertToDTO(savedUser));
    }

    @PostMapping("/profile/create")
    public ResponseEntity<UserProfileDTO> createUserProfile(@RequestBody UserProfileDTO userProfileDTO) {
        if (userProfileService.existsByUsername(userProfileDTO.getUsername())) {
            return ResponseEntity.badRequest().body(null);
        }

        if (userProfileService.existsByEmail(userProfileDTO.getEmail())) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<User> userOptional = userService.findUserById(userProfileDTO.getUserId());
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }

        User user = userOptional.get();
        UserProfile userProfile = new UserProfile(
                userProfileDTO.getUsername(),
                userProfileDTO.getEmail(),
                encoder.encode(userProfileDTO.getPassword()),
                user
        );

        // Set additional fields
        userProfile.setFirstName(userProfileDTO.getFirstName());
        userProfile.setMiddleName(userProfileDTO.getMiddleName());
        userProfile.setLastName(userProfileDTO.getLastName());
        userProfile.setPhone(userProfileDTO.getPhone());
        userProfile.setGender(userProfileDTO.getGender());
        userProfile.setAge(userProfileDTO.getAge());
        userProfile.setDescription(userProfileDTO.getDescription());
        userProfile.setPaymentType(userProfileDTO.getPaymentType());
        // Additional logic to set Address and other relationships can be added here

        UserProfile savedUserProfile = userProfileService.saveUserProfile(userProfile);
        return ResponseEntity.ok(convertToDTO(savedUserProfile));
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    private UserProfileDTO convertToDTO(UserProfile userProfile) {
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setId(userProfile.getId());
        userProfileDTO.setUsername(userProfile.getUsername());
        userProfileDTO.setEmail(userProfile.getEmail());
        userProfileDTO.setPassword(userProfile.getPassword());
        userProfileDTO.setFirstName(userProfile.getFirstName());
        userProfileDTO.setMiddleName(userProfile.getMiddleName());
        userProfileDTO.setLastName(userProfile.getLastName());
        userProfileDTO.setPhone(userProfile.getPhone());
        userProfileDTO.setGender(userProfile.getGender());
        userProfileDTO.setAge(userProfile.getAge());
        userProfileDTO.setDescription(userProfile.getDescription());
        userProfileDTO.setPaymentType(userProfile.getPaymentType());
        userProfileDTO.setUserId(userProfile.getUser().getId());
        if (userProfile.getAddress() != null) {
            userProfileDTO.setAddressId(userProfile.getAddress().getAddressId());
        }
        // Map other relationships if necessary
        return userProfileDTO;
    }
}
