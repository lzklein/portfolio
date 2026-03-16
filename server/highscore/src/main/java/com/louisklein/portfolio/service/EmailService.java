package com.louisklein.portfolio.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String contactEmail;

    public void sendContactEmail(String email, String subject, String message) {

        // Prevent header injection
        subject = subject.replaceAll("[\\r\\n]", "");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(contactEmail);
        mail.setSubject("Portfolio Contact: " + subject);
        mail.setText("From: " + email + "\n\n" + message);

        mailSender.send(mail);
    }
}