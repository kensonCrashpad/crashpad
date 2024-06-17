package com.crashpad.springjwt.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class PaymentDTO {
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
    
}
