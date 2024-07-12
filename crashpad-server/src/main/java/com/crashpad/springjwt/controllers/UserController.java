package com.crashpad.springjwt.controllers;

import com.crashpad.springjwt.dto.RvFormDTO;
import com.crashpad.springjwt.dto.TravelerFormDTO;
import com.crashpad.springjwt.dto.UserDTO;
import com.crashpad.springjwt.dto.UserProfileDTO;
import com.crashpad.springjwt.models.User;
import com.crashpad.springjwt.models.UserProfile;
import com.crashpad.springjwt.models.Vehicle;
import com.crashpad.springjwt.models.VehicleImage;
import com.crashpad.springjwt.payload.request.UserIdRequest;
import com.crashpad.springjwt.security.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private VehicleImageService vehicleImageService;


    @Autowired
    private S3FileUploadService s3FileUploadService;


    @PostMapping("/{userId}/uploadProfileImage")
    public ResponseEntity<String> uploadProfileImage(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {

        Optional<User> userOptional = userService.findUserById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        String fileUrl = s3FileUploadService.uploadFile(file);
        UserProfile userProfile = userOptional.get().getUserProfile();
        userProfile.setProfileImage(fileUrl);
        userProfileService.saveUserProfile(userProfile);

        return ResponseEntity.ok(fileUrl);
    }



    @PostMapping("/{userId}/saveTravelerAndRvDetails")
    public ResponseEntity<?> saveTravelerAndRvDetails(
            @PathVariable Long userId,
            @RequestPart("travelerFormData") TravelerFormDTO travelerFormData,
            @RequestPart("rvFormData") RvFormDTO rvFormData,
            @RequestPart(value = "travelerImage", required = false) MultipartFile travelerImage,
            @RequestPart(value = "rvImages", required = false) List<MultipartFile> rvImages) {

        Optional<User> userOptional = userService.findUserById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        UserProfile userProfile = user.getUserProfile();
        if (userProfile == null) {
            userProfile = new UserProfile();
            userProfile.setUser(user);
        }

        // Save traveler details to user profile
        userProfile.setFirstName(travelerFormData.getFirstName());
        userProfile.setLastName(travelerFormData.getLastName());
        userProfile.setAge(travelerFormData.getAge());
        userProfile.setGender(travelerFormData.getGender());
        userProfile.setPhone(travelerFormData.getPhone());
        userProfile.setDescription(travelerFormData.getAboutMe());

        if (travelerImage != null && !travelerImage.isEmpty()) {
            String travelerImageUrl = fileStorageService.store(travelerImage);
            userProfile.setProfileImage(travelerImageUrl);
        }

        userProfileService.saveUserProfile(userProfile);

        // Save RV details to vehicle table
        Vehicle vehicle = new Vehicle();
        vehicle.setType(rvFormData.getType());
        vehicle.setLength(rvFormData.getLength());
        vehicle.setWidth(rvFormData.getWidth());
        vehicle.setHeight(rvFormData.getHeight());
        vehicle.setYear(rvFormData.getYear());
        vehicle.setMake(rvFormData.getMake());
        vehicle.setModel(rvFormData.getModel());
        vehicle.setVehicleDescription(rvFormData.getVehicleDescription());
        vehicle.setUserProfile(userProfile);

        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);

        // Save RV images
        if (rvImages != null && !rvImages.isEmpty()) {
            List<VehicleImage> savedImages = new ArrayList<>();
            for (MultipartFile image : rvImages) {
                String imageUrl = fileStorageService.store(image);
                VehicleImage vehicleImage = new VehicleImage();
                vehicleImage.setImageUrl(imageUrl);
                vehicleImage.setVehicle(savedVehicle);
                savedImages.add(vehicleImageService.saveVehicleImage(vehicleImage));
            }
        }

        return ResponseEntity.ok("Traveler and RV details saved successfully");
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.badRequest().body("One or more files are too large!");
    }


    @PostMapping("/create")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        if (userService.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body(null);
        }

        if (userService.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body(null);
        }

        User user = new User(
                userDTO.getUsername(),
                userDTO.getEmail(),
                encoder.encode(userDTO.getPassword()),
                userDTO.getRole()
        );

        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(convertToDTO(savedUser));
    }
    @PostMapping("/profile/get")
    public ResponseEntity<UserProfileDTO> getUserProfile(@RequestBody UserIdRequest userIdRequest) {
        UserProfile userProfile = userProfileService.findUserProfileByUserId(userIdRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User profile not found with id: " + userIdRequest.getUserId()));

        return ResponseEntity.ok(convertToDTO(userProfile));
    }

    @PostMapping("/profile/update")
    public ResponseEntity<UserProfileDTO> updateUserProfile(@RequestBody UserProfileDTO userProfileDTO) {
        Optional<UserProfile> userProfileOptional = userProfileService.findUserProfileByUserId(userProfileDTO.getUserId());

        UserProfile userProfile = userProfileOptional.get();
        userProfile.setFirstName(userProfileDTO.getFirstName());
        //userProfile.setMiddleName(userProfileDTO.getMiddleName());
        userProfile.setLastName(userProfileDTO.getLastName());
        // userProfile.setPhone(userProfileDTO.getPhone());
        userProfile.setGender(userProfileDTO.getGender());
        userProfile.setAge(userProfileDTO.getAge());
        userProfile.setDescription(userProfileDTO.getDescription());
        userProfile.setProfileImage(userProfileDTO.getProfileImage());
        // userProfile.setPaymentType(userProfileDTO.getPaymentType());
        UserProfile updatedUserProfile = userProfileService.saveUserProfile(userProfile);

        return ResponseEntity.ok(convertToDTO(updatedUserProfile));
    }





    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    private UserProfileDTO convertToDTO(UserProfile userProfile) {
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setId(userProfile.getId());
        userProfileDTO.setUsername(userProfile.getUsername());
        userProfileDTO.setEmail(userProfile.getEmail());
        userProfileDTO.setFirstName(userProfile.getFirstName());
        userProfileDTO.setMiddleName(userProfile.getMiddleName());
        userProfileDTO.setLastName(userProfile.getLastName());
        userProfileDTO.setPhone(userProfile.getPhone());
        userProfileDTO.setGender(userProfile.getGender());
        userProfileDTO.setAge(userProfile.getAge());
        userProfileDTO.setDescription(userProfile.getDescription());
        userProfileDTO.setPaymentType(userProfile.getPaymentType());
        userProfileDTO.setProfileImage(userProfile.getProfileImage());
        userProfileDTO.setUserId(userProfile.getUser().getId());

        // Map other relationships if necessary
        return userProfileDTO;
    }
}
