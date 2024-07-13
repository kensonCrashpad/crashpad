package com.crashpad.springjwt.repository;

import com.crashpad.springjwt.models.Property;
import com.crashpad.springjwt.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.Favorites;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {

    Optional<Favorites> findByUserProfileAndProperty(UserProfile userProfile, Property property);

    List<Favorites> findByUserProfile(UserProfile userProfile);

}