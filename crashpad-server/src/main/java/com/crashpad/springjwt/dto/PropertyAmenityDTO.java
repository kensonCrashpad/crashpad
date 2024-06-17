package com.crashpad.springjwt.dto;

import lombok.Data;

@Data
public class PropertyAmenityDTO {
	
    private Long propertyAmenityId;
    private Integer quantity;
    private String dateCreated;
    private String amenityAvailability;
    private Double costOfAmenity;

}
