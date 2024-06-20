package com.crashpad.springjwt.repository;

import com.crashpad.springjwt.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<UserProfile> findByUserId(Long userId);


}
