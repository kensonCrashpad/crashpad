package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "vehicle_image")
public class VehicleImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleImageId;

    private String imageUrl;
    private String caption;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
}
