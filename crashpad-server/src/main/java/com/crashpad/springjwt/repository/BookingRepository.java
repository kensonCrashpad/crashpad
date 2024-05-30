package com.crashpad.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	
}