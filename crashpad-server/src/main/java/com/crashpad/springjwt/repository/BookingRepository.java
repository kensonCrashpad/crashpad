package com.crashpad.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByHostId(Long hostId);
//    List<Booking> findByUserProfileId(Long travelerId);

    List<Booking> findByTravelerId(Long travelerId);
}