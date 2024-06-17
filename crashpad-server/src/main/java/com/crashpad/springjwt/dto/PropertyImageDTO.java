package com.crashpad.springjwt.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class PropertyImageDTO {
    private Long propertyImageId;
    private String caption;
    private String imageUrl;
	
}
