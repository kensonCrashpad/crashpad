package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "property_price")
public class PropertyPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long priceId;

    private Double weekdayPrice;
    private Double weekendPrice;
    private Double holidayPrice;

    @OneToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

}
