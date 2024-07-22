package com.crashpad.springjwt.dto;

import lombok.Data;

import java.util.List;

@Data
public class BookingResponseDTO {
    private Long bookingId;
    private String startDate;
    private String endDate;
    private String userCreationDate;
    private String userModifyDate;
    private String statusOfBooking;
    private Double totalCost;
    private String specialRequests;
    private Long hostId;
    private Long travelerId;

    // Property details
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

    // Property images
    private List<String> imageUrls;
}
