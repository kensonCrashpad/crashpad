package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "property_amenity")
public class PropertyAmenity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long propertyAmenityId;

	private Integer quantity;
	private String dateCreated;
	private String amenityAvailability;
	private Double costOfAmenity;

	@ManyToOne
	@JoinColumn(name = "property_id")
	private Property property;

	@ManyToOne
	@JoinColumn(name = "amenity_id")
	private Amenity amenity;

}