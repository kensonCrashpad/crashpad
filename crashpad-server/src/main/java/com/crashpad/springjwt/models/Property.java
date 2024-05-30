package com.crashpad.springjwt.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "property")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;

    private String availability;
    private String padNumber;
    private String propertyType;
    private String userCreationDate;
    private String userModifyDate;
    private String padMaxWidth;
    private String padMaxLength;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(mappedBy = "property")
    private Set<Booking> bookings;

    @OneToMany(mappedBy = "property")
    private Set<PropertyImage> propertyImages;

    @OneToMany(mappedBy = "property")
    private Set<Favorites> favorites;

    @OneToMany(mappedBy = "property")
    private Set<PropertyAmenity> propertyAmenities;


    
}
