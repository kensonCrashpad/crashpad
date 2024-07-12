package com.crashpad.springjwt.security.services;

import com.crashpad.springjwt.dto.HostDetailsDTO;
import com.crashpad.springjwt.dto.PropertyDetailsResponseDTO;
import com.crashpad.springjwt.dto.PropertyResponseDTO;
import com.crashpad.springjwt.models.Amenity;
import com.crashpad.springjwt.models.PropertyImage;
import com.crashpad.springjwt.models.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crashpad.springjwt.models.Property;
import com.crashpad.springjwt.repository.PropertyRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PropertyImageService propertyImageService;

    @Autowired
    private AmenityService amenityService;


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

    public PropertyDetailsResponseDTO getPropertyDetailsById(Long propertyId) {
        Optional<Property> propertyOptional = propertyRepository.findById(propertyId);
        if (!propertyOptional.isPresent()) {
            return null;
        }

        Property property = propertyOptional.get();
        UserProfile hostProfile = property.getUser().getUserProfile();

        PropertyDetailsResponseDTO propertyDetails = new PropertyDetailsResponseDTO();
        propertyDetails.setPropertyId(property.getPropertyId());
        propertyDetails.setPropertyType(property.getPropertyType());
        propertyDetails.setTitle(property.getTitle());
        propertyDetails.setName(property.getName());
        propertyDetails.setStreet(property.getStreet());
        propertyDetails.setCity(property.getCity());
        propertyDetails.setState(property.getState());
        propertyDetails.setZip(property.getZip());
        propertyDetails.setCapacity(property.getCapacity());
        propertyDetails.setPadMaxLength(property.getPadMaxLength());
        propertyDetails.setPadMaxWidth(property.getPadMaxWidth());
        propertyDetails.setDescription(property.getDescription());
        propertyDetails.setAvailability(property.getAvailability());
        propertyDetails.setOriginalPrice(property.getOriginalPrice());
        propertyDetails.setDiscountedPrice(property.getDiscountedPrice());

        List<Amenity> amenities = amenityService.findAmenitiesByPropertyId(property.getPropertyId());
        List<String> amenityNames = amenities.stream().map(Amenity::getAmenityName).collect(Collectors.toList());
        propertyDetails.setAmenities(amenityNames);



        List<PropertyImage> images = propertyImageService.findPropertyImagesByPropertyId(property.getPropertyId());
        List<String> imageUrls = images.stream()
                .map(PropertyImage::getImageUrl)
                .collect(Collectors.toList());
        propertyDetails.setImageUrls(imageUrls);


        propertyDetails.setUserCreationDate(property.getUserCreationDate());
        propertyDetails.setUserModifyDate(property.getUserModifyDate());

        HostDetailsDTO hostDetails = new HostDetailsDTO();
        hostDetails.setUserId(hostProfile.getId());
        hostDetails.setUsername(hostProfile.getUsername());
        hostDetails.setEmail(hostProfile.getEmail());
        hostDetails.setFirstName(hostProfile.getFirstName());
        hostDetails.setLastName(hostProfile.getLastName());
        hostDetails.setPhone(hostProfile.getPhone());
        hostDetails.setGender(hostProfile.getGender());
        hostDetails.setAge(hostProfile.getAge());
        hostDetails.setDescription(hostProfile.getDescription());

        propertyDetails.setHostDetails(hostDetails);

        return propertyDetails;
    }

    public List<PropertyResponseDTO> searchProperties(String query) {
        List<Property> properties = propertyRepository.findByCityContainingIgnoreCaseOrStateContainingIgnoreCase(query, query);
        return properties.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
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

        List<Amenity> amenities = amenityService.findAmenitiesByPropertyId(property.getPropertyId());
        List<String> amenityNames = amenities.stream().map(Amenity::getAmenityName).collect(Collectors.toList());
        propertyResponseDTO.setAmenities(amenityNames);


        List<PropertyImage> images = propertyImageService.findPropertyImagesByPropertyId(property.getPropertyId());
        List<String> imageUrls = images.stream()
                .map(PropertyImage::getImageUrl)
                .collect(Collectors.toList());
        propertyResponseDTO.setImageUrls(imageUrls);

        return propertyResponseDTO;
    }

}
