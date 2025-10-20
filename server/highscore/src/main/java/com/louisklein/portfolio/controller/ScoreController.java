package com.louisklein.portfolio.controller;

import com.louisklein.portfolio.service.ScoreService;

public class ScoreController {
    private final ScoreService service;

    public ScoreController(ScoreService service){
        this.service = service;
    }

}
