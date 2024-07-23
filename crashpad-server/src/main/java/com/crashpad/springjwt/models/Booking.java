package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Data
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private String pastBooking;
    private String currentBooking;

    private LocalDate startDate;
    private LocalDate endDate;

    private String userCreationDate;
    private String userModifyDate;
    private String statusOfBooking;
    private Double totalCost;
    private String specialRequests;
    private Long hostId;
    private Long travelerId;
    private Long propertyId;

}
