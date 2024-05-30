package com.crashpad.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crashpad.springjwt.models.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
