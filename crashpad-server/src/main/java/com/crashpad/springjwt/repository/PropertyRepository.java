package com.crashpad.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.Property;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByUserId(Long userId);

    List<Property> findByCityContainingIgnoreCaseOrStateContainingIgnoreCase(String city, String state);

}