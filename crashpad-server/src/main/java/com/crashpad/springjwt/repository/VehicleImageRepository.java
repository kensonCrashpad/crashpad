package com.crashpad.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.VehicleImage;

@Repository
public interface VehicleImageRepository extends JpaRepository<VehicleImage, Long> {
	
}