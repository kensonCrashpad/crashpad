package com.crashpad.springjwt.security.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

//    private final Path profilePictures = Paths.get("profile-pictures");

    private final Path rootLocation = Paths.get("propertyImage");

    public FileStorageService() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory!");
        }
    }

//    public String store(MultipartFile file) {
//        try {
//            String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
//            Path destinationFile = rootLocation.resolve(
//                            Paths.get(filename))
//                    .normalize().toAbsolutePath();
//            Files.copy(file.getInputStream(), destinationFile);
//            return destinationFile.toString();
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to store file", e);
//        }
//    }

    public String store(MultipartFile file) {
        try {
            String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
            Path destinationFile = rootLocation.resolve(
                            Paths.get(filename))
                    .normalize().toAbsolutePath();
            Files.copy(file.getInputStream(), destinationFile);
            return "/images/" + filename; // Return the relative path
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }


    public void delete(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Could not delete file. Error: " + e.getMessage());
        }
    }

}
