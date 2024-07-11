package com.crashpad.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crashpad.springjwt.models.Property;
import com.crashpad.springjwt.repository.PropertyRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> findAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> findPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    public List<Property> findPropertiesByUserId(Long userId) {
        return propertyRepository.findByUserId(userId);
    }
}
