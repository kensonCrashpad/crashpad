package com.crashpad.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.PropertyAmenity;

@Repository
public interface PropertyAmenityRepository extends JpaRepository<PropertyAmenity, Long> {

}