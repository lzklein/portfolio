package com.louisklein.portfolio.controller;
import com.louisklein.portfolio.dto.ContactForm;
import com.louisklein.portfolio.service.CaptchaService;
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

    @Autowired
    private CaptchaService captchaService;

    @PostMapping
    public ResponseEntity<?> submitForm(
            @RequestBody ContactForm form,
            HttpServletRequest request) {

        // 1️⃣ Honeypot check
        if (form.getCompany() != null && !form.getCompany().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // 2️⃣ Detect real IP (proxy safe)
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty()) {
            ip = request.getRemoteAddr();
        }

        // 3️⃣ Rate limit check
        Bucket bucket = rateLimitService.resolveBucket(ip);

        if (!bucket.tryConsume(1)) {
            return ResponseEntity
                    .status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Rate limit exceeded. Try again later.");
        }

        // 4️⃣ CAPTCHA verification
        if (!captchaService.verify(form.getCaptchaToken())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Captcha verification failed");
        }

        // 5️⃣ Send email
        emailService.sendContactEmail(
                form.getEmail(),
                form.getSubject(),
                form.getMessage()
        );

        return ResponseEntity.ok("Message sent");
    }
}