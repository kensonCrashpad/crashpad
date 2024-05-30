package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "amenity")
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long amenityId;

    private String amenityName;

    @OneToMany(mappedBy = "amenity")
    private Set<PropertyAmenity> propertyAmenities;

}
