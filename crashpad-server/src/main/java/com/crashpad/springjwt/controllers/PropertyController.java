package com.crashpad.springjwt.controllers;

import com.crashpad.springjwt.dto.PropertyDTO;
import com.crashpad.springjwt.dto.PropertyImageDTO;
import com.crashpad.springjwt.models.Property;
import com.crashpad.springjwt.models.PropertyImage;
import com.crashpad.springjwt.models.User;
import com.crashpad.springjwt.models.Booking;
import com.crashpad.springjwt.models.PropertyAmenity;
import com.crashpad.springjwt.models.PropertyImage;
import com.crashpad.springjwt.models.Favorites;
import com.crashpad.springjwt.security.services.FileStorageService;
import com.crashpad.springjwt.security.services.PropertyImageService;
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
@RequestMapping("/api/property")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertyImageService propertyImageService;

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
       // propertyDTO.setPadNumber(property.getPadNumber());
        propertyDTO.setPropertyType(property.getPropertyType());
        propertyDTO.setUserCreationDate(property.getUserCreationDate());
        propertyDTO.setUserModifyDate(property.getUserModifyDate());
        propertyDTO.setPadMaxWidth(property.getPadMaxWidth());
        propertyDTO.setPadMaxLength(property.getPadMaxLength());
        propertyDTO.setDescription(property.getDescription());
        return propertyDTO;
    }

    private Property convertToEntity(PropertyDTO propertyDTO) {
        Property property = new Property();
        property.setAvailability(propertyDTO.getAvailability());
        property.setCapacity(propertyDTO.getCapacity());
        //property.setPadNumber(propertyDTO.getPadNumber());
        property.setPropertyType(propertyDTO.getPropertyType());
        property.setUserCreationDate(propertyDTO.getUserCreationDate());
        property.setUserModifyDate(propertyDTO.getUserModifyDate());
        property.setPadMaxWidth(propertyDTO.getPadMaxWidth());
        property.setPadMaxLength(propertyDTO.getPadMaxLength());
        property.setDescription(propertyDTO.getDescription());

        //Set Address Parameters
        property.setStreet(propertyDTO.getStreet());
        property.setCity(propertyDTO.getCity());
        property.setState(propertyDTO.getState());
        property.setZip(propertyDTO.getZip());



        return property;
    }

    private PropertyImageDTO convertToDTO(PropertyImage propertyImage) {
        PropertyImageDTO propertyImageDTO = new PropertyImageDTO();
        propertyImageDTO.setPropertyImageId(propertyImage.getPropertyImageId());
        propertyImageDTO.setCaption(propertyImage.getCaption());
        propertyImageDTO.setImageUrl(propertyImage.getImageUrl());
        return propertyImageDTO;
    }


}