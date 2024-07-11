package com.crashpad.springjwt.security.services;

import com.crashpad.springjwt.models.UserProfile;
import com.crashpad.springjwt.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfile saveUserProfile(UserProfile userProfile) {
        return userProfileRepository.save(userProfile);
    }

    public Optional<UserProfile> findUserProfileById(Long id) {
        return userProfileRepository.findById(id);
    }

    public boolean existsByUsername(String username) {
        return userProfileRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userProfileRepository.existsByEmail(email);


    }

    public Optional<UserProfile> findUserProfileByUserId(Long userId) {
        return userProfileRepository.findByUserId(userId);
    }

}
