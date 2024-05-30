package com.crashpad.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crashpad.springjwt.models.VehicleImage;
import com.crashpad.springjwt.repository.VehicleImageRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleImageService {

    @Autowired
    private VehicleImageRepository vehicleImageRepository;

    public List<VehicleImage> findAllVehicleImages() {
        return vehicleImageRepository.findAll();
    }

    public Optional<VehicleImage> findVehicleImageById(Long id) {
        return vehicleImageRepository.findById(id);
    }

    public VehicleImage saveVehicleImage(VehicleImage vehicleImage) {
        return vehicleImageRepository.save(vehicleImage);
    }

    public void deleteVehicleImage(Long id) {
        vehicleImageRepository.deleteById(id);
    }
}
