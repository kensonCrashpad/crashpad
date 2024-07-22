package com.crashpad.springjwt.controllers;

import com.crashpad.springjwt.dto.ApiResponse;
import com.crashpad.springjwt.dto.BookingDTO;
import com.crashpad.springjwt.dto.BookingResponseDTO;
import com.crashpad.springjwt.models.Booking;
import com.crashpad.springjwt.models.Property;
import com.crashpad.springjwt.models.PropertyImage;
import com.crashpad.springjwt.models.UserProfile;
import com.crashpad.springjwt.security.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertyImageService propertyImageService;

    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingDTO bookingDTO) {

        Optional<Property> propertyOptional = propertyService.findPropertyById(bookingDTO.getPropertyId());
        if (!propertyOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Property property = propertyOptional.get();

        Booking booking = new Booking();

        booking.setStartDate(LocalDate.parse(bookingDTO.getStartDate(), DateTimeFormatter.ISO_DATE));
        booking.setEndDate(LocalDate.parse(bookingDTO.getEndDate(), DateTimeFormatter.ISO_DATE));

//        booking.setStartDate(bookingDTO.getStartDate());
//        booking.setEndDate(bookingDTO.getEndDate());

        booking.setStatusOfBooking(bookingDTO.getStatusOfBooking());
        booking.setTotalCost(bookingDTO.getTotalCost());
        booking.setSpecialRequests(bookingDTO.getSpecialRequests());
        booking.setUserCreationDate(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        booking.setUserModifyDate(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        booking.setHostId(property.getUser().getId());
        booking.setPropertyId(bookingDTO.getPropertyId());
        booking.setTravelerId(bookingDTO.getTravelerId());
        Booking savedBooking = bookingService.saveBooking(booking);

        return ResponseEntity.ok(savedBooking);
    }

    @GetMapping("/host/{hostId}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsForHost(@PathVariable Long hostId) {
        List<Booking> bookings = bookingService.findBookingsByHostId(hostId);
        List<BookingResponseDTO> bookingResponseDTOs = bookings.stream().map(this::convertToBookingResponseDTO).collect(Collectors.toList());
        return ResponseEntity.ok(bookingResponseDTOs);
    }

    @GetMapping("/traveler/{travelerId}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsForTraveler(@PathVariable Long travelerId) {
        List<Booking> bookings = bookingService.findBookingsByTravelerId(travelerId);
        List<BookingResponseDTO> bookingResponseDTOs = bookings.stream().map(this::convertToBookingResponseDTO).collect(Collectors.toList());
        return ResponseEntity.ok(bookingResponseDTOs);
    }

    private BookingResponseDTO convertToBookingResponseDTO(Booking booking) {
        BookingResponseDTO bookingResponseDTO = new BookingResponseDTO();
        bookingResponseDTO.setBookingId(booking.getBookingId());

//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
//
//        try {
//            bookingResponseDTO.setStartDate(LocalDate.parse(booking.getStartDate().toString(), formatter).format(formatter));
//            bookingResponseDTO.setEndDate(LocalDate.parse(booking.getEndDate().toString(), formatter).format(formatter));
//        } catch (DateTimeParseException e) {
//            e.printStackTrace();
//        }

        bookingResponseDTO.setStartDate(booking.getStartDate().toString());
        bookingResponseDTO.setEndDate(booking.getEndDate().toString());
        bookingResponseDTO.setUserCreationDate(booking.getUserCreationDate());
        bookingResponseDTO.setUserModifyDate(booking.getUserModifyDate());
        bookingResponseDTO.setStatusOfBooking(booking.getStatusOfBooking());
        bookingResponseDTO.setTotalCost(booking.getTotalCost());
        bookingResponseDTO.setSpecialRequests(booking.getSpecialRequests());
        bookingResponseDTO.setHostId(booking.getHostId());
        bookingResponseDTO.setTravelerId(booking.getTravelerId());

        Optional<Property> propertyOptional = propertyService.findPropertyById(booking.getPropertyId());
        if (propertyOptional.isPresent()) {
            Property property = propertyOptional.get();
            bookingResponseDTO.setPropertyId(property.getPropertyId());
            bookingResponseDTO.setPropertyType(property.getPropertyType());
            bookingResponseDTO.setTitle(property.getTitle());
            bookingResponseDTO.setName(property.getName());
            bookingResponseDTO.setStreet(property.getStreet());
            bookingResponseDTO.setCity(property.getCity());
            bookingResponseDTO.setState(property.getState());
            bookingResponseDTO.setZip(property.getZip());
            bookingResponseDTO.setCapacity(property.getCapacity());
            bookingResponseDTO.setPadMaxLength(property.getPadMaxLength());
            bookingResponseDTO.setPadMaxWidth(property.getPadMaxWidth());
            bookingResponseDTO.setDescription(property.getDescription());
            bookingResponseDTO.setAvailability(property.getAvailability());
            bookingResponseDTO.setOriginalPrice(property.getOriginalPrice());
            bookingResponseDTO.setDiscountedPrice(property.getDiscountedPrice());

            List<PropertyImage> images = propertyImageService.findPropertyImagesByPropertyId(property.getPropertyId());
            List<String> imageUrls = images.stream()
                    .map(PropertyImage::getImageUrl)
                    .collect(Collectors.toList());
            bookingResponseDTO.setImageUrls(imageUrls);

//            List<String> imageUrls = propertyImageService.findPropertyImagesByPropertyId(property.getPropertyId()).stream()
//                    .map(image -> image.getImageUrl())
//                    .collect(Collectors.toList());
//            bookingResponseDTO.setImageUrls(imageUrls);
        }

        return bookingResponseDTO;
    }

}
