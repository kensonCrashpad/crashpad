package com.crashpad.springjwt.dto;

import lombok.Data;

@Data
public class PropertyPriceDTO {
    private Long priceId;
    private Double weekdayPrice;
    private Double weekendPrice;
    private Double holidayPrice;
    

}
