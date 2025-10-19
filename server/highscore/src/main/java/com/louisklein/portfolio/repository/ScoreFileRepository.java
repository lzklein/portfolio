package com.louisklein.portfolio.repository;

import com.louisklein.portfolio.model.Score;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class ScoreFileRepository implements ScoreRepository {
    private static final String CSV_FILE_PATH = "src/main/resources/scores.csv";

    @Override
    public List<Score> findAll() {
        List<Score> scores = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(CSV_FILE_PATH))) {
            String line = br.readLine();

            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length < 4) continue;

                try {
                    int id = Integer.parseInt(parts[0].trim());
                    int score = Integer.parseInt(parts[1].trim());
                    String initials = parts[2].trim();
                    String timestamp = parts[3].trim();

                    scores.add(new Score(id, score, initials, timestamp));
                } catch (NumberFormatException e) {
                    System.err.println("Invalid data in line: " + line);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV: " + e.getMessage());
        }

        return scores;
    }

    @Override
    public void saveAll(List<Score> scores) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(CSV_FILE_PATH))) {
            bw.write("id,score,initials,timestamp\n");
            for (Score s : scores) {
                bw.write(s.getId() + "," + s.getScore() + "," + s.getInitials() + "," + s.getTimestamp() + "\n");
            }
        } catch (IOException e) {
            System.err.println("Error writing CSV: " + e.getMessage());
        }
    }
}
