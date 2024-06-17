package com.crashpad.springjwt.dto;

import lombok.Data;

@Data
public class AddressDTO {
	
    private Long addressId;
    private String street;
    private String city;
    private String state;
    private String zip;


}
