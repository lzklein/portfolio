package com.louisklein.portfolio.controller;

import com.louisklein.portfolio.model.Score;
import com.louisklein.portfolio.service.ScoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*")
public class ScoreController {
    private final ScoreService service;

    public ScoreController(ScoreService service){
        this.service = service;
    }

    @GetMapping
    public List<Score> getTopScores() {
        return service.getTopScores();
    }

    @PostMapping
    public void addScore(@RequestBody Score score) {
        service.addScore(score.getScore(), score.getInitials());
    }
}
