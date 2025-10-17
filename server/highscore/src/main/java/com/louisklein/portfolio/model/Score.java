package com.louisklein.portfolio.model;

public class Score {
    private int id;
    private int score;
    private String initials;
    private String timestamp;

    public Score(int id, int score, String initials, String timestamp) {
        this.id = id;
        this.score = score;
        this.initials = initials;
        this.timestamp = timestamp;
    }

    public int getId() { return id; }
    public int getScore() { return score; }
    public String getInitials() { return initials; }
    public String getTimestamp() { return timestamp; }

    public void setId(int id) { this.id = id; }
    public void setScore(int score) { this.score = score; }
    public void setInitials(String initials) { this.initials = initials; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    @Override
    public String toString() {
        return "Score{" +
                "id=" + id +
                ", score=" + score +
                ", initials='" + initials + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
