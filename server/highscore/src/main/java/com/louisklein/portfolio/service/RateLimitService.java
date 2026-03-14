package com.louisklein.portfolio.service;
import io.github.bucket4j.*;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {

    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    public Bucket resolveBucket(String ip) {
        return buckets.computeIfAbsent(ip, this::createBucket);
    }

//    10 requests per hour
    private Bucket createBucket(String ip) {
        Bandwidth limit = Bandwidth.simple(10, Duration.ofHours(1));
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}