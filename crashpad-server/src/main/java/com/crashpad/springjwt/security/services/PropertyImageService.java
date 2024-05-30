package com.crashpad.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crashpad.springjwt.models.PropertyImage;
import com.crashpad.springjwt.repository.PropertyImageRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyImageService {

    @Autowired
    private PropertyImageRepository propertyImageRepository;

    public List<PropertyImage> findAllPropertyImages() {
        return propertyImageRepository.findAll();
    }

    public Optional<PropertyImage> findPropertyImageById(Long id) {
        return propertyImageRepository.findById(id);
    }

    public PropertyImage savePropertyImage(PropertyImage propertyImage) {
        return propertyImageRepository.save(propertyImage);
    }

    public void deletePropertyImage(Long id) {
        propertyImageRepository.deleteById(id);
    }
}
