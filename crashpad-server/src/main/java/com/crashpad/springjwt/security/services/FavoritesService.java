package com.crashpad.springjwt.security.services;

import com.crashpad.springjwt.models.Property;
import com.crashpad.springjwt.models.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crashpad.springjwt.models.Favorites;
import com.crashpad.springjwt.repository.FavoritesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FavoritesService {

    @Autowired
    private FavoritesRepository favoritesRepository;

    public List<Favorites> findAllFavorites() {
        return favoritesRepository.findAll();
    }

    public Optional<Favorites> findFavoriteById(Long id) {
        return favoritesRepository.findById(id);
    }

    public Favorites saveFavorite(Favorites favorite) {
        return favoritesRepository.save(favorite);
    }

    public Optional<Favorites> findFavoriteByUserProfileAndProperty(UserProfile userProfile, Property property) {
        return favoritesRepository.findByUserProfileAndProperty(userProfile, property);
    }

    public void removeFavorite(Favorites favorite) {
        favoritesRepository.delete(favorite);
    }

    public List<Favorites> findByUserProfile(UserProfile userProfile) {
        return favoritesRepository.findByUserProfile(userProfile);
    }

    public void deleteFavorite(Long id) {
        favoritesRepository.deleteById(id);
    }
} 	
