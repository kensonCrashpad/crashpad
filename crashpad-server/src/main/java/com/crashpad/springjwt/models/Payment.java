package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private String paymentMethod;
    private String paymentDate;
    private String street;
    private String city;
    private String state;
    private String zip;
    private String transactionNumber;
    private Double netPaymentAmount;
    private String paymentStatus;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;


    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
    
}
