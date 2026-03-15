package com.louisklein.portfolio.dto;

public class ContactForm {

    private String email;
    private String subject;
    private String message;

    private String company;      // honeypot
    private String captchaToken; // recaptcha

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getCaptchaToken() { return captchaToken; }
    public void setCaptchaToken(String captchaToken) { this.captchaToken = captchaToken; }
}