package com.louisklein.portfolio.repository;

import com.louisklein.portfolio.model.Score;

import java.util.List;

public interface ScoreRepository {
    List<Score> findAll();

    void saveAll(List<Score> scores);
}
