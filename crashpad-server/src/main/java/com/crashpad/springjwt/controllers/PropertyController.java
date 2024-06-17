package com.crashpad.springjwt.controllers;

import com.crashpad.springjwt.dto.PropertyDTO;
import com.crashpad.springjwt.dto.PropertyImageDTO;
import com.crashpad.springjwt.dto.PropertyPriceDTO;
import com.crashpad.springjwt.models.Property;
import com.crashpad.springjwt.models.PropertyImage;
import com.crashpad.springjwt.models.PropertyPrice;
import com.crashpad.springjwt.models.User;
import com.crashpad.springjwt.security.services.FileStorageService;
import com.crashpad.springjwt.security.services.PropertyImageService;
import com.crashpad.springjwt.security.services.PropertyPriceService;
import com.crashpad.springjwt.security.services.PropertyService;
import com.crashpad.springjwt.security.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertyImageService propertyImageService;

    @Autowired
    private PropertyPriceService propertyPriceService;

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/{userId}/add")
    public ResponseEntity<PropertyDTO> addProperty(
            @PathVariable Long userId,
            @RequestPart("property") PropertyDTO propertyDTO,
            @RequestPart("propertyImages") List<MultipartFile> propertyImages) {

        Optional<User> userOptional = userService.findUserById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        Property property = convertToEntity(propertyDTO);
        property.setUser(user);

        // Save property price
        PropertyPrice propertyPrice = convertToEntity(propertyDTO.getPropertyPrice());
        propertyPrice.setProperty(property);
        property.setPropertyPrice(propertyPrice);

        Property savedProperty = propertyService.saveProperty(property);

        List<PropertyImage> savedImages = new ArrayList<>();
        for (MultipartFile image : propertyImages) {
            String imageUrl = fileStorageService.store(image);
            PropertyImage propertyImage = new PropertyImage();
            propertyImage.setImageUrl(imageUrl);
            propertyImage.setProperty(savedProperty);
            savedImages.add(propertyImageService.savePropertyImage(propertyImage));
        }

        PropertyDTO savedPropertyDTO = convertToDTO(savedProperty);
        savedPropertyDTO.setImageUrls(savedImages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList()));

        return ResponseEntity.ok(savedPropertyDTO);
    }

    @PostMapping("/{propertyId}/add-images")
    public ResponseEntity<PropertyDTO> addPropertyImages(
            @PathVariable Long propertyId,
            @RequestPart("propertyImages") List<MultipartFile> propertyImages) {

        Optional<Property> propertyOptional = propertyService.findPropertyById(propertyId);
        if (!propertyOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Property property = propertyOptional.get();
        List<PropertyImage> savedImages = new ArrayList<>();
        for (MultipartFile image : propertyImages) {
            String imageUrl = fileStorageService.store(image);
            PropertyImage propertyImage = new PropertyImage();
            propertyImage.setImageUrl(imageUrl);
            propertyImage.setProperty(property);
            savedImages.add(propertyImageService.savePropertyImage(propertyImage));
        }

        PropertyDTO propertyDTO = convertToDTO(property);
        propertyDTO.setImageUrls(savedImages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList()));

        return ResponseEntity.ok(propertyDTO);
    }

    @DeleteMapping("/{propertyId}/delete-image/{imageId}")
    public ResponseEntity<Void> deletePropertyImage(
            @PathVariable Long propertyId,
            @PathVariable Long imageId) {

        Optional<Property> propertyOptional = propertyService.findPropertyById(propertyId);
        if (!propertyOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<PropertyImage> imageOptional = propertyImageService.findPropertyImageById(imageId);
        if (!imageOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        PropertyImage propertyImage = imageOptional.get();
        if (!propertyImage.getProperty().getPropertyId().equals(propertyId)) {
            return ResponseEntity.badRequest().build();
        }

        propertyImageService.deletePropertyImage(imageId);
        return ResponseEntity.noContent().build();
    }

    private PropertyDTO convertToDTO(Property property) {
        PropertyDTO propertyDTO = new PropertyDTO();
        propertyDTO.setPropertyId(property.getPropertyId());
        propertyDTO.setAvailability(property.getAvailability());
        propertyDTO.setPadNumber(property.getPadNumber());
        propertyDTO.setPropertyType(property.getPropertyType());
        propertyDTO.setUserCreationDate(property.getUserCreationDate());
        propertyDTO.setUserModifyDate(property.getUserModifyDate());
        propertyDTO.setPadMaxWidth(property.getPadMaxWidth());
        propertyDTO.setPadMaxLength(property.getPadMaxLength());
        propertyDTO.setDescription(property.getDescription());
        propertyDTO.setPropertyPrice(convertToDTO(property.getPropertyPrice()));
        return propertyDTO;
    }

    private Property convertToEntity(PropertyDTO propertyDTO) {
        Property property = new Property();
        property.setAvailability(propertyDTO.getAvailability());
        property.setPadNumber(propertyDTO.getPadNumber());
        property.setPropertyType(propertyDTO.getPropertyType());
        property.setUserCreationDate(propertyDTO.getUserCreationDate());
        property.setUserModifyDate(propertyDTO.getUserModifyDate());
        property.setPadMaxWidth(propertyDTO.getPadMaxWidth());
        property.setPadMaxLength(propertyDTO.getPadMaxLength());
        property.setDescription(propertyDTO.getDescription());
        return property;
    }

    private PropertyImageDTO convertToDTO(PropertyImage propertyImage) {
        PropertyImageDTO propertyImageDTO = new PropertyImageDTO();
        propertyImageDTO.setPropertyImageId(propertyImage.getPropertyImageId());
        propertyImageDTO.setCaption(propertyImage.getCaption());
        propertyImageDTO.setImageUrl(propertyImage.getImageUrl());
        return propertyImageDTO;
    }

    private PropertyPriceDTO convertToDTO(PropertyPrice propertyPrice) {
        PropertyPriceDTO propertyPriceDTO = new PropertyPriceDTO();
        propertyPriceDTO.setPriceId(propertyPrice.getPriceId());
        propertyPriceDTO.setWeekdayPrice(propertyPrice.getWeekdayPrice());
        propertyPriceDTO.setWeekendPrice(propertyPrice.getWeekendPrice());
        propertyPriceDTO.setHolidayPrice(propertyPrice.getHolidayPrice());
        return propertyPriceDTO;
    }

    private PropertyPrice convertToEntity(PropertyPriceDTO propertyPriceDTO) {
        PropertyPrice propertyPrice = new PropertyPrice();
        propertyPrice.setWeekdayPrice(propertyPriceDTO.getWeekdayPrice());
        propertyPrice.setWeekendPrice(propertyPriceDTO.getWeekendPrice());
        propertyPrice.setHolidayPrice(propertyPriceDTO.getHolidayPrice());
        return propertyPrice;
    }
}