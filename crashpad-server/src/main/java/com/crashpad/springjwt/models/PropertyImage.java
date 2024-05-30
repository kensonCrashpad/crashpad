package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "property_image")
public class PropertyImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyImageId;

    private String caption;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    
}
