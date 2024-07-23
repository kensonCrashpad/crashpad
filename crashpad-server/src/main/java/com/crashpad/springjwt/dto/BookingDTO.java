package com.crashpad.springjwt.dto;

import lombok.Data;

@Data
public class BookingDTO {
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
    private Long propertyId;
}
