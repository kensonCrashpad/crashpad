package com.crashpad.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crashpad.springjwt.models.Amenity;
import com.crashpad.springjwt.repository.AmenityRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AmenityService {

    @Autowired
    private AmenityRepository amenityRepository;

    public List<Amenity> findAllAmenities() {
        return amenityRepository.findAll();
    }

    public Optional<Amenity> findAmenityById(Long id) {
        return amenityRepository.findById(id);
    }

    public Amenity saveAmenity(Amenity amenity) {
        return amenityRepository.save(amenity);
    }

    public void deleteAmenity(Long id) {
        amenityRepository.deleteById(id);
    }

    public List<Amenity> findAmenitiesByPropertyId(Long propertyId) {
        return amenityRepository.findByProperty_PropertyId(propertyId);
    }
}
