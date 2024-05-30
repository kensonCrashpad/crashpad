package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String street;
    private String city;
    private String state;
    private String zip;

    @OneToMany(mappedBy = "address")
    private Set<UserProfile> userProfile;

    @OneToMany(mappedBy = "address")
    private Set<Property> properties;
    
    
}
