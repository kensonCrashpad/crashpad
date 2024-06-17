package com.crashpad.springjwt.dto;

import lombok.Data;

@Data
public class ReviewDTO {
	
	private Long reviewId;
    private Integer rating;
    private String reviewText;
    private String reviewDate;

}
