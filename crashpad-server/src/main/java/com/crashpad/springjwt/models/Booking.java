package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private String pastBooking;
    private String currentBooking;
    private String startDate;
    private String endDate;
    private String userCreationDate;
    private String userModifyDate;
    private String statusOfBooking;
    private Double totalCost;
    private String specialRequests;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
}
