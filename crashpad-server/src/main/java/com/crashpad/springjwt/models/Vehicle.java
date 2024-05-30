package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "vehicle")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;

    private String type;
    private String length;
    private String width;
    private String height;
    private String year;
    private String make;
    private String model;
    private String vehicleDescription;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

	@OneToMany(mappedBy = "vehicle")
    private Set<VehicleImage> vehicleImages;

}
