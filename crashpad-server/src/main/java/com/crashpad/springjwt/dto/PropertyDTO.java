package com.crashpad.springjwt.dto;

import java.util.List;

import lombok.Data;

@Data
public class PropertyDTO {
	
	private Long propertyId;
    private String availability;
    private String padNumber;
    private String propertyType;
    private String userCreationDate;
    private String userModifyDate;
    private String padMaxWidth;
    private String padMaxLength;
    private String description;
    private List<PropertyImageDTO> imageUrls;
    private PropertyPriceDTO propertyPrice;

}
