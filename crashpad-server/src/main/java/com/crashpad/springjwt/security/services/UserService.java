package com.crashpad.springjwt.security.services;

import com.crashpad.springjwt.models.User;
import com.crashpad.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public User findUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return user;

    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
