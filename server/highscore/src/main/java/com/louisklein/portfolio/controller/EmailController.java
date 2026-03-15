package com.louisklein.portfolio.controller;
import com.louisklein.portfolio.service.EmailService;
import com.louisklein.portfolio.service.RateLimitService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailController {
    @Autowired
    private RateLimitService rateLimitService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public <ContactForm> ResponseEntity<?> submitForm(
            @RequestBody ContactForm form,
            HttpServletRequest request) {

        String ip = request.getRemoteAddr();
        Bucket bucket = rateLimitService.resolveBucket(ip);

        if (!bucket.tryConsume(1)) {
            return ResponseEntity
                    .status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Rate limit exceeded. Try again later.");
        }

        return ResponseEntity.ok("Message sent");
    }
}
