package com.crashpad.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crashpad.springjwt.models.PropertyPrice;
import com.crashpad.springjwt.repository.PropertyPriceRepository;

import java.util.Optional;

@Service
public class PropertyPriceService {

    @Autowired
    private PropertyPriceRepository propertyPriceRepository;

    public Optional<PropertyPrice> findPriceById(Long id) {
        return propertyPriceRepository.findById(id);
    }

    public PropertyPrice savePrice(PropertyPrice propertyPrice) {
        return propertyPriceRepository.save(propertyPrice);
    }

    public void deletePrice(Long id) {
        propertyPriceRepository.deleteById(id);
    }
}
