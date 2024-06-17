package com.crashpad.springjwt.security.services;

import com.crashpad.springjwt.models.MailBody;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {

        this.javaMailSender = javaMailSender;
    }

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendSimpleMessage(MailBody mailBody, String email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setFrom("crashpad231@gmail.com");
            message.setSubject(mailBody.getSubject());
            message.setText(mailBody.getText());

            javaMailSender.send(message);
        } catch (MailException e) {
            // Handle email sending failure gracefully
            logger.error("Failed to send email: {}", e.getMessage());
        }
    }
}
