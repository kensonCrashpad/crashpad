package com.crashpad.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crashpad.springjwt.models.PropertyAmenity;
import com.crashpad.springjwt.repository.PropertyAmenityRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyAmenityService {

    @Autowired
    private PropertyAmenityRepository propertyAmenityRepository;

    public List<PropertyAmenity> findAllPropertyAmenities() {
        return propertyAmenityRepository.findAll();
    }

    public Optional<PropertyAmenity> findPropertyAmenityById(Long id) {
        return propertyAmenityRepository.findById(id);
    }

    public PropertyAmenity savePropertyAmenity(PropertyAmenity propertyAmenity) {
        return propertyAmenityRepository.save(propertyAmenity);
    }

    public void deletePropertyAmenity(Long id) {
        propertyAmenityRepository.deleteById(id);
    }
}
