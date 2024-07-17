package com.crashpad.springjwt.security.services;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class S3FileUploadService {

    @Value("${aws.s3.access.key}")
    private String awsS3AccessKey;

    @Value("${aws.s3.secret.key}")
    private String awsS3SecretKey;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    private AmazonS3 s3Client;

    @PostConstruct
    public void init() {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
        this.s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .withRegion(Regions.US_EAST_2)
                .build();
    }

    public String uploadFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            InputStream inputStream = file.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            metadata.setContentType(file.getContentType());
            s3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, metadata));
            return s3Client.getUrl(bucketName, fileName).toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to S3", e);
        }
    }



    public String uploadPropertyImages(MultipartFile file) {
        try {
            String folderName="Property"; // The folder in which you want to upload the file
            String fileName= file.getOriginalFilename();
            String fileKey= folderName + "/" + fileName; // Construct the full key with the folder name
            InputStream inputStream= file.getInputStream();
            ObjectMetadata metadata=new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            metadata.setContentType(file.getContentType());
            s3Client.putObject(new PutObjectRequest(bucketName, fileKey, inputStream, metadata));
            return s3Client.getUrl(bucketName, fileKey).toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to S3", e);
        }
    }

}
