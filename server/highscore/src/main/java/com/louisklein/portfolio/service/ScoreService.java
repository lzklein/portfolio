package com.louisklein.portfolio.service;

import com.louisklein.portfolio.model.Score;
import com.louisklein.portfolio.repository.ScoreRepository;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

public class ScoreService {
    private final ScoreRepository repository;

    public ScoreService(ScoreRepository repository) {
        this.repository = repository;
    }

    public List<Score> getTopScores() {
        return (List<Score>) repository.findAll();
    }

    public void addScore(int score, String initials) {
        List<Score> scores = repository.findAll();

        // Generate a new ID (max existing + 1)
        int newId = scores.stream()
                .mapToInt(Score::getId)
                .max()
                .orElse(0) + 1;

        Score newScore = new Score(newId, score, initials, Instant.now().toString());
        scores.add(newScore);

        scores.sort(Comparator.comparingInt(Score::getScore).reversed());
        scores = scores.subList(0, 5);

        repository.saveAll(scores);
    }
}
