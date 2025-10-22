package com.louisklein.portfolio.service;

import com.louisklein.portfolio.model.Score;
import com.louisklein.portfolio.repository.ScoreRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ScoreServiceTest {

    private ScoreRepository repository;
    private ScoreService service;

    @BeforeEach
    void setUp() {
        repository = mock(ScoreRepository.class); // mock repository
        service = new ScoreService(repository);
    }

    @Test
    void testGetTopScores_returnsSortedList() {
        List<Score> mockScores = new ArrayList<>();
        mockScores.add(new Score(1, 100, "AA", "t1"));
        mockScores.add(new Score(2, 200, "BB", "t2"));
        mockScores.add(new Score(3, 150, "CC", "t3"));

        when(repository.findAll()).thenReturn(new ArrayList<>(mockScores));

        List<Score> topScores = service.getTopScores();

        // log the scores
        System.out.println("Top Scores (sorted):");
        topScores.forEach(score ->
                System.out.println(score.getInitials() + " -> " + score.getScore())
        );

        assertEquals(3, topScores.size());
        assertEquals(200, topScores.get(0).getScore()); // highest first
        assertEquals(150, topScores.get(1).getScore());
        assertEquals(100, topScores.get(2).getScore());
    }

    @Test
    void testAddScore_insertsAndTrimsTop5() {
        List<Score> mockScores = new ArrayList<>();
        // create 5 scores
        for (int i = 1; i <= 5; i++) {
            mockScores.add(new Score(i, i * 100, "A" + i, "t" + i));
        }

        when(repository.findAll()).thenReturn(new ArrayList<>(mockScores));

        // simulate saveAll to capture the argument
        doAnswer(invocation -> {
            List<Score> saved = invocation.getArgument(0);

            // log the scores being saved
            System.out.println("Scores being saved (top 5):");
            saved.forEach(score ->
                    System.out.println(score.getInitials() + " -> " + score.getScore())
            );

            assertEquals(5, saved.size()); // always trimmed to top 5
            assertTrue(saved.stream().anyMatch(s -> s.getScore() == 600));
            return null;
        }).when(repository).saveAll(anyList());

        service.addScore(600, "ZZ"); // add a new top score

        verify(repository, times(1)).saveAll(anyList());
    }
}
