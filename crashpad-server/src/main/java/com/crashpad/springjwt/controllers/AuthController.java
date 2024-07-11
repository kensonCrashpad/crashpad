package com.crashpad.springjwt.controllers;
import com.crashpad.springjwt.models.UserProfile;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.crashpad.springjwt.models.User;
import com.crashpad.springjwt.payload.request.LoginRequest;
import com.crashpad.springjwt.payload.request.SignupRequest;
import com.crashpad.springjwt.payload.response.JwtResponse;
import com.crashpad.springjwt.payload.response.MessageResponse;

import com.crashpad.springjwt.repository.UserRepository;
import com.crashpad.springjwt.repository.UserProfileRepository;
import com.crashpad.springjwt.security.jwt.JwtUtils;
import com.crashpad.springjwt.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserProfileRepository userProfileRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  JavaMailSender emailSender;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(),
                         userDetails.getRole()));
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(), 
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()), signUpRequest.getRole());

    userRepository.save(user);

    //Create user profile
    UserProfile userProfile = new UserProfile();
    userProfile.setUser(user);
    userProfile.setEmail(signUpRequest.getEmail());
    userProfile.setUsername(signUpRequest.getUsername());
    userProfile.setRole(signUpRequest.getRole());
    // Persist user profile to database
    userProfileRepository.save(userProfile);

    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);


    return ResponseEntity.ok(new JwtResponse(jwt,
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole()));
    //return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

}
