package com.crashpad.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.Favorites;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {
	
}