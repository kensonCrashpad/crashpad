package com.crashpad.springjwt.controllers;

import com.crashpad.springjwt.dto.ApiResponse;
import com.crashpad.springjwt.dto.PropertyResponseDTO;
import com.crashpad.springjwt.models.*;
import com.crashpad.springjwt.security.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertyImageService propertyImageService;

    @Autowired
    private AmenityService amenityService;

    @PostMapping("/add")
    public ResponseEntity<?> addFavorite(@RequestParam Long userId, @RequestParam Long propertyId) {
        Optional<UserProfile> userProfileOptional = userProfileService.findUserProfileByUserId(userId);
        Optional<Property> propertyOptional = propertyService.findPropertyById(propertyId);

        if (!userProfileOptional.isPresent() || !propertyOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        UserProfile userProfile = userProfileOptional.get();
        Property property = propertyOptional.get();

        Favorites favorite = new Favorites();
        favorite.setUserProfile(userProfile);
        favorite.setProperty(property);

        favoritesService.saveFavorite(favorite);

        return ResponseEntity.ok("Property marked as favorite successfully");
    }

    @PostMapping("/remove")
    public ResponseEntity<?> removeFavorite(@RequestParam Long userId, @RequestParam Long propertyId) {
        Optional<UserProfile> userProfileOptional = userProfileService.findUserProfileByUserId(userId);
        if (userProfileOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Property> propertyOptional = propertyService.findPropertyById(propertyId);
        if (propertyOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserProfile userProfile = userProfileOptional.get();
        Property property = propertyOptional.get();

        Optional<Favorites> favoriteOptional = favoritesService.findFavoriteByUserProfileAndProperty(userProfile, property);
        if (favoriteOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("fail");
        }

        favoritesService.removeFavorite(favoriteOptional.get());

        return ResponseEntity.ok("success");
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<PropertyResponseDTO> getUserFavorites(@PathVariable Long userId) {
        Optional<UserProfile> userProfileOptional = userProfileService.findUserProfileByUserId(userId);
        if (userProfileOptional.isEmpty()) {
            return new ApiResponse<>("fail", "User Not Found", null);
        }

        UserProfile userProfile = userProfileOptional.get();
        List<Favorites> favorites = favoritesService.findByUserProfile(userProfile);
        List<PropertyResponseDTO> favoriteProperties = favorites.stream()
                .map(favorite -> convertToResponseDTO(favorite.getProperty()))
                .collect(Collectors.toList());

        return new ApiResponse<>("success", "Properties fetched successfully", favoriteProperties);

    }

    private PropertyResponseDTO convertToResponseDTO(Property property) {
        PropertyResponseDTO propertyDTO = new PropertyResponseDTO();
        propertyDTO.setPropertyId(property.getPropertyId());
        propertyDTO.setPropertyType(property.getPropertyType());
        propertyDTO.setTitle(property.getTitle());
        propertyDTO.setName(property.getName());
        propertyDTO.setStreet(property.getStreet());
        propertyDTO.setCity(property.getCity());
        propertyDTO.setState(property.getState());
        propertyDTO.setZip(property.getZip());
        propertyDTO.setCapacity(property.getCapacity());
        propertyDTO.setPadMaxLength(property.getPadMaxLength());
        propertyDTO.setPadMaxWidth(property.getPadMaxWidth());
        propertyDTO.setDescription(property.getDescription());
        propertyDTO.setAvailability(property.getAvailability());
        propertyDTO.setOriginalPrice(property.getOriginalPrice());
        propertyDTO.setDiscountedPrice(property.getDiscountedPrice());

        List<Amenity> amenities = amenityService.findAmenitiesByPropertyId(property.getPropertyId());
        List<String> amenityNames = amenities.stream().map(Amenity::getAmenityName).collect(Collectors.toList());
        propertyDTO.setAmenities(amenityNames);



        List<PropertyImage> images = propertyImageService.findPropertyImagesByPropertyId(property.getPropertyId());
        List<String> imageUrls = images.stream()
                .map(PropertyImage::getImageUrl)
                .collect(Collectors.toList());
        propertyDTO.setImageUrls(imageUrls);


        propertyDTO.setUserCreationDate(property.getUserCreationDate().toString());
        propertyDTO.setUserModifyDate(property.getUserModifyDate().toString());
        return propertyDTO;
    }
}
