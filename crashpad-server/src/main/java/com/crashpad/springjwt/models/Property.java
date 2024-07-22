package com.crashpad.springjwt.models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "property")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;

    private String availability;
    private String propertyType;//Ask Kenson
    private LocalDateTime userCreationDate;
    private LocalDateTime userModifyDate;
    private String padMaxWidth;
    private String padMaxLength;
    private String description;
    private Integer capacity;

    //AddressFields
    private String street;
    private String city;
    private String state;
    private String zip;

    //private List<String> imageUrls;  // Make sure to import List from java.util

    //Pricing Fields
    private String discountedPrice;
    private String originalPrice;
    private String qualifier;

    //Property Name
    private String title;
    private String name;

    //Property Co-ordinate
    private Double latitude;
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "property")
    private Set<PropertyImage> propertyImages;

    @OneToMany(mappedBy = "property")
    private Set<Favorites> favorites;

    @OneToMany(mappedBy = "property")
    private Set<Amenity> propertyAmenities;

}
