package com.crashpad.springjwt.converter;

import com.crashpad.springjwt.dto.PropertyDTO;
import com.crashpad.springjwt.models.Property;
import com.crashpad.springjwt.models.User;
import com.crashpad.springjwt.models.Booking;
import com.crashpad.springjwt.models.PropertyImage;
import com.crashpad.springjwt.models.Favorites;
import com.crashpad.springjwt.models.PropertyAmenity;

import java.util.stream.Collectors;

public class PropertyConverter {

    public static PropertyDTO convertToDTO(Property property) {
        PropertyDTO dto = new PropertyDTO();
        dto.setPropertyId(property.getPropertyId());
        dto.setAvailability(property.getAvailability());
        dto.setPropertyType(property.getPropertyType());
        dto.setUserCreationDate(property.getUserCreationDate());
        dto.setUserModifyDate(property.getUserModifyDate());
        dto.setPadMaxWidth(property.getPadMaxWidth());
        dto.setPadMaxLength(property.getPadMaxLength());
        dto.setDescription(property.getDescription());
        dto.setCapacity(property.getCapacity());
        dto.setStreet(property.getStreet());
        dto.setCity(property.getCity());
        dto.setState(property.getState());
        dto.setZip(property.getZip());
        dto.setDiscountedPrice(property.getDiscountedPrice());
        dto.setOriginalPrice(property.getOriginalPrice());
        dto.setQualifier(property.getQualifier());
        dto.setTitle(property.getTitle());
        dto.setName(property.getName());
        dto.setLatitude(property.getLatitude());
        dto.setLongitude(property.getLongitude());
        dto.setUserId(property.getUser().getId());
//        dto.setBookingIds(property.getBookings().stream().map(Booking::getId).collect(Collectors.toSet()));
//        dto.setPropertyImageIds(property.getPropertyImages().stream().map(PropertyImage::getId).collect(Collectors.toSet()));
//        dto.setFavoriteIds(property.getFavorites().stream().map(Favorites::getId).collect(Collectors.toSet()));
//        dto.setPropertyAmenityIds(property.getPropertyAmenities().stream().map(PropertyAmenity::getId).collect(Collectors.toSet()));
        return dto;
    }

    public static Property convertToEntity(PropertyDTO dto, User user) {
        Property property = new Property();
        property.setPropertyId(dto.getPropertyId());
        property.setAvailability(dto.getAvailability());
        property.setPropertyType(dto.getPropertyType());
        property.setUserCreationDate(dto.getUserCreationDate());
        property.setUserModifyDate(dto.getUserModifyDate());
        property.setPadMaxWidth(dto.getPadMaxWidth());
        property.setPadMaxLength(dto.getPadMaxLength());
        property.setDescription(dto.getDescription());
        property.setCapacity(dto.getCapacity());
        property.setStreet(dto.getStreet());
        property.setCity(dto.getCity());
        property.setState(dto.getState());
        property.setZip(dto.getZip());
        property.setDiscountedPrice(dto.getDiscountedPrice());
        property.setOriginalPrice(dto.getOriginalPrice());
        property.setQualifier(dto.getQualifier());
        property.setTitle(dto.getTitle());
        property.setName(dto.getName());
        property.setLatitude(dto.getLatitude());
        property.setLongitude(dto.getLongitude());
        property.setUser(user);
//        property.setBookings(bookings);
//        property.setPropertyImages(propertyImages);
//        property.setFavorites(favorites);
//        property.setPropertyAmenities(propertyAmenities);
        return property;
    }
}
