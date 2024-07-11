package com.crashpad.springjwt.dto;

import lombok.Data;

import java.util.List;

@Data
public class ApiResponse<T> {
    private String status;
    private String message;
    private List<T> data;

    public ApiResponse(String status, String message, List<T> data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

}
