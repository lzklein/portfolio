package com.louisklein.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactEmail(String email, String subject, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("your_email@gmail.com");
        mail.setSubject("Portfolio Contact: " + subject);
        mail.setText("From: " + email + "\n\n" + message);

        mailSender.send(mail);
    }
}
