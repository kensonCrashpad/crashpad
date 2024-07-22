package com.crashpad.springjwt.controllers;

import com.crashpad.springjwt.dto.*;
import com.crashpad.springjwt.models.*;
import com.crashpad.springjwt.models.PropertyImage;
import com.crashpad.springjwt.security.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
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

    @Autowired
    private AmenityService amenityService;

    @Autowired
    private S3FileUploadService s3FileUploadService;


    @GetMapping("/all-properties")
    public ApiResponse<PropertyResponseDTO> getAllProperties() {
        List<Property> properties = propertyService.findAllProperties();
        List<PropertyResponseDTO> propertyResponseDTOs = properties.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());

        return new ApiResponse<>("success", "All properties fetched successfully", propertyResponseDTOs);
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<PropertyDTO> addProperty(
            @PathVariable Long userId,
            @RequestPart("property") PropertyDTO propertyDTO,
            @RequestPart("propertyImages") List<MultipartFile> propertyImages, @RequestPart("amenities") List<String> amenities) {

        Optional<User> userOptional = userService.findUserById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        Property property = convertToEntity(propertyDTO);
        property.setUser(user);


        Property savedProperty = propertyService.saveProperty(property);

        //save property images
        List<PropertyImage> savedImages = new ArrayList<>();
        for (MultipartFile image : propertyImages) {
            String propertyImagesS3url = s3FileUploadService.uploadPropertyImages(image);
            PropertyImage propertyImage = new PropertyImage();
            propertyImage.setImageUrl(propertyImagesS3url);
            propertyImage.setProperty(savedProperty);
            savedImages.add(propertyImageService.savePropertyImage(propertyImage));
        }

        // Save amenities
        for (String amenityName : amenities) {
            Amenity amenity = new Amenity();
            amenity.setAmenityName(amenityName);
            amenity.setProperty(savedProperty);
            amenityService.saveAmenity(amenity);
        }


        PropertyDTO savedPropertyDTO = convertToDTO(savedProperty);
//        savedPropertyDTO.setImageUrls(savedImages.stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList()));

        return ResponseEntity.ok(savedPropertyDTO);
    }


    @GetMapping("/{userId}/properties")
    public ApiResponse<PropertyResponseDTO> getUserProperties(@PathVariable Long userId) {
        List<Property> properties = propertyService.findPropertiesByUserId(userId);
        List<PropertyResponseDTO> propertyResponseDTOs = properties.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());

        return new ApiResponse<>("success", "Properties fetched successfully", propertyResponseDTOs);
    }


    @GetMapping("/search")
    public ResponseEntity<List<PropertyResponseDTO>> searchProperties(@RequestParam String query) {
        List<PropertyResponseDTO> properties = propertyService.searchProperties(query);
        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(properties);
    }

    private PropertyResponseDTO convertToResponseDTO(Property property) {
        PropertyResponseDTO propertyResponseDTO = new PropertyResponseDTO();
        propertyResponseDTO.setPropertyId(property.getPropertyId());
        propertyResponseDTO.setPropertyType(property.getPropertyType());
        propertyResponseDTO.setTitle(property.getTitle());
        propertyResponseDTO.setName(property.getName());
        propertyResponseDTO.setStreet(property.getStreet());
        propertyResponseDTO.setCity(property.getCity());
        propertyResponseDTO.setState(property.getState());
        propertyResponseDTO.setZip(property.getZip());
        propertyResponseDTO.setCapacity(property.getCapacity());
        propertyResponseDTO.setPadMaxLength(property.getPadMaxLength());
        propertyResponseDTO.setPadMaxWidth(property.getPadMaxWidth());
        propertyResponseDTO.setDescription(property.getDescription());
        propertyResponseDTO.setAvailability(property.getAvailability());
        propertyResponseDTO.setOriginalPrice(property.getOriginalPrice());
        propertyResponseDTO.setDiscountedPrice(property.getDiscountedPrice());
        propertyResponseDTO.setUserCreationDate(property.getUserCreationDate().toString());
        propertyResponseDTO.setUserModifyDate(property.getUserModifyDate().toString());
        propertyResponseDTO.setLongitude(propertyResponseDTO.getLongitude());
        propertyResponseDTO.setLatitude(propertyResponseDTO.getLatitude());
        propertyResponseDTO.setHostId(property.getUser().getId());

        List<Amenity> amenities = amenityService.findAmenitiesByPropertyId(property.getPropertyId());
        List<String> amenityNames = amenities.stream().map(Amenity::getAmenityName).collect(Collectors.toList());
        propertyResponseDTO.setAmenities(amenityNames);



        List<PropertyImage> images = propertyImageService.findPropertyImagesByPropertyId(property.getPropertyId());
        List<String> imageUrls = images.stream()
                .map(PropertyImage::getImageUrl)
                .collect(Collectors.toList());
        propertyResponseDTO.setImageUrls(imageUrls);

//        List<String> imageUrls = images.stream().map(PropertyImage::getImageUrl).collect(Collectors.toList());
//        propertyResponseDTO.setImageUrls(imageUrls);

        return propertyResponseDTO;
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

            String originalFilename = image.getOriginalFilename();
            String uniqueFilename = UUID.randomUUID().toString() + "-" + originalFilename;
            String relativePath = "/propertyImages/" + uniqueFilename;


            String imageUrl = fileStorageService.store(image);
            PropertyImage propertyImage = new PropertyImage();
            propertyImage.setImageUrl(imageUrl);
            propertyImage.setProperty(property);
            savedImages.add(propertyImageService.savePropertyImage(propertyImage));
        }

        PropertyDTO propertyDTO = convertToDTO(property);
//        propertyDTO.setImageUrls(savedImages.stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList()));

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


    @GetMapping("/{propertyId}/details")
    public ResponseEntity<PropertyDetailsResponseDTO> getPropertyDetails(
            @PathVariable Long propertyId) {

        PropertyDetailsResponseDTO propertyDetails = propertyService.getPropertyDetailsById(propertyId);
        if (propertyDetails == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(propertyDetails);
    }


    private PropertyDTO convertToDTO(Property property) {
        PropertyDTO propertyDTO = new PropertyDTO();
        propertyDTO.setPropertyId(property.getPropertyId());
        propertyDTO.setAvailability(property.getAvailability());
        propertyDTO.setCapacity(property.getCapacity());
        propertyDTO.setPropertyType(property.getPropertyType());
        propertyDTO.setUserCreationDate(property.getUserCreationDate());
        propertyDTO.setUserModifyDate(property.getUserModifyDate());
        propertyDTO.setPadMaxWidth(property.getPadMaxWidth());
        propertyDTO.setPadMaxLength(property.getPadMaxLength());
        propertyDTO.setDescription(property.getDescription());

        //Set Address Parameters
        propertyDTO.setStreet(property.getStreet());
        propertyDTO.setCity(property.getCity());
        propertyDTO.setState(property.getState());
        propertyDTO.setZip(property.getZip());

        //Set Price parameters
        propertyDTO.setOriginalPrice(property.getOriginalPrice());
        propertyDTO.setDiscountedPrice(property.getDiscountedPrice());

        propertyDTO.setTitle(property.getTitle());
        propertyDTO.setName(property.getName());

        return propertyDTO;
    }


    private Property convertToEntity(PropertyDTO propertyDTO) {
        Property property = new Property();
        property.setAvailability(propertyDTO.getAvailability());
        property.setCapacity(propertyDTO.getCapacity());
        //property.setPadNumber(propertyDTO.getPadNumber());
        property.setPropertyType(propertyDTO.getPropertyType());

        property.setUserCreationDate(LocalDateTime.now()); // Set the current date and time
        property.setUserModifyDate(LocalDateTime.now()); // Set the current date and time for modification date
        property.setPadMaxWidth(propertyDTO.getPadMaxWidth());
        property.setPadMaxLength(propertyDTO.getPadMaxLength());
        property.setDescription(propertyDTO.getDescription());

        //Set Address Parameters
        property.setStreet(propertyDTO.getStreet());
        property.setCity(propertyDTO.getCity());
        property.setState(propertyDTO.getState());
        property.setZip(propertyDTO.getZip());

        //Set Price parameters
        property.setOriginalPrice(propertyDTO.getOriginalPrice());
        property.setDiscountedPrice(propertyDTO.getDiscountedPrice());

        property.setTitle(propertyDTO.getTitle());
        property.setName(propertyDTO.getName());


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