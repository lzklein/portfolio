package com.louisklein.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class CaptchaService {

    @Value("${spring.recaptcha.secret}")
    private String secret;

    public boolean verify(String token) {
        String url = "https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + token;
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.postForObject(url, null, Map.class);
        if(response!=null){
            return (Boolean) response.get("success");
        }
        return false;
    }
}