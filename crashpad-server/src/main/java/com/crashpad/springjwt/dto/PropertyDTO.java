package com.crashpad.springjwt.dto;

import java.util.List;

import lombok.Data;

@Data
public class PropertyDTO {

    private Long propertyId;
    private String availability;
    private String propertyType;
    private String userCreationDate;
    private String userModifyDate;
    private String padMaxWidth;
    private String padMaxLength;
    private String description;
    private Integer capacity;
    private String street;
    private String city;
    private String state;
    private String zip;
    private String discountedPrice;
    private String originalPrice;
    private String qualifier;
    private String title;
    private String name;
    private Double latitude;
    private Double longitude;
    private Long userId;
    private List<Long> bookingIds;
    private List<Long> propertyImageIds;
    private List<Long> favoriteIds;
    private List<Long> propertyAmenityIds;
    private List<PropertyImageDTO> imageUrls;


}

