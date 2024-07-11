package com.crashpad.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.Amenity;

import java.util.List;

@Repository
public interface AmenityRepository extends JpaRepository<Amenity, Long> {

    List<Amenity> findByProperty_PropertyId(Long propertyId);

}