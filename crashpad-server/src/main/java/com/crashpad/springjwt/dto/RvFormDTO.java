package com.crashpad.springjwt.dto;

import lombok.Data;

@Data
public class RvFormDTO {
    private String type;
    private String length;
    private String width;
    private String height;
    private String year;
    private String make;
    private String model;
    private String vehicleDescription;
}
