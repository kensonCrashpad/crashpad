package com.crashpad.springjwt.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private Integer rating;
    private String reviewText;
    private String reviewDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;


    // Getters and Setters
    
    
}
