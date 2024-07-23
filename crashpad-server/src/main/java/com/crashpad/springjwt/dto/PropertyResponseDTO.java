package com.crashpad.springjwt.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PropertyResponseDTO {
    private Long propertyId;
    private String propertyType;
    private String title;
    private String name;
    private String street;
    private String city;
    private String state;
    private String zip;
    private Integer capacity;
    private String padMaxLength;
    private String padMaxWidth;
    private String description;
    private String availability;
    private String originalPrice;
    private String discountedPrice;
    private List<String> amenities;
    private List<String> imageUrls;
    private String userCreationDate;
    private String userModifyDate;
    private Double latitude;
    private Double longitude;
    private Long hostId;

    private String distance;
    private String rating;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    // Getters and Setters
    // You can use Lombok annotations here if preferred
}
