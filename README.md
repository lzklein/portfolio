# Portfolio Website & Tower Defense Game

**Full Stack Project** • React frontend | Spring Boot backend

This repository contains my personal **portfolio website** with an integrated **tower defense game** and a simple high‑score backend server. The project is a work‑in-progress (WIP). Some frontend parts and game mechanics are still under active development.

---

## 🔧 Project Overview

### 🧠 Backend — High Score Tracking Server

The backend is built with **Spring Boot (Java)** and follows an MVC architecture with unit testing on the service layer.

**Folder structure:**

server/highscore/
- src/main/java/...          (Controllers, Services, Models)
- src/test/java/...          (Unit tests, Service layer)
- resources/leaderboard.csv  (CSV storing top 5 scores)

**Functionality**
- Maintains a simple leaderboard stored in a CSV file with columns: id, score, initials, timestamp
- Only keeps the **top 5 scores**
- Provides API endpoints to:
  - View current high scores
  - Submit a new score
  - Automatically reorder leaderboard
- Service layer is unit-tested with JUnit

---

### 🖥️ Frontend — Portfolio Site + Tower Defense Game

The frontend is a **React** application.

**Folder structure:**

client/src/
- assets/       (Resume, Certification, Images, etc.)
- components/  (React components)
- hooks/ (Custome React hooks)
- style/ (CSS Stylesheets)

Current portfolio pages:
- About Me
- Projects
- Resume
- Contact
- Tower Defense Game page (WIP)

Styling is minimal; CSS and responsive design are still under development.

---

## 🕹️ Tower Defense Game (WIP)

The tower defense game currently runs in **debug mode**, with interactions triggered by buttons instead of fully interactive gameplay.

**Implemented features:**
- Towers:
  - Multiple types with unique behaviors
  - Piercing, AoE, slowing, chain lightning
- Enemies:
  - Varying health, damage, and speed
- Game board:
  - Expandable columns
  - Wave system with prebuilt enemy groups
- Bonus challenges:
  - Checkbox-based options for waves with extra enemies
  - Rewards not yet implemented
- Wave spawning logic:
  - Waves generated based on wave count
  - Sequential spawning from prebuilt enemy groups

**Planned score system:**
- Wave count determines score
- Score will be submitted to backend leaderboard

---

## 🚀 Quick Start

### Backend
Navigate to the backend folder: `cd server/highscore`  
Build and run with Maven: `mvn clean install` then `mvn spring-boot:run`  
Backend will run on `http://localhost:8080`

### Frontend
Navigate to the client folder: `cd client`  
Install dependencies: `npm install`  
Run the development server: `npm start`  
Frontend will run on `http://localhost:3000`

> Note: Tower defense game is in debug mode; portfolio styling is minimal.

---

## 🧪 Project Status

| Area                           | Status                       |
|--------------------------------|------------------------------|
| Backend high score API         | ✅ Functional                |
| Portfolio pages (React)        | ⚠️ Basic, minimal styling    |
| Tower defense mechanics        | ⚠️ WIP, debug mode           |
| Game score <> backend submit   | ⚠️ Not yet connected         |
| Visual polish & CSS styling    | ⚠️ WIP                       |

> WIP = Work in progress — sections will be expanded as development continues

---

## 🧰 Tech Stack

- Frontend: React, JavaScript
- Backend: Spring Boot, Java
- Testing: JUnit (service layer)
- Data storage: CSV file for leaderboard

---

## 📌 Future Improvements

- Complete gameplay loop (mouse controls, wave progression)
- Implement bonus reward logic on wave completion
- Connect game scoring to backend leaderboard
- Add responsive styling and visual polish
- Improve portfolio UI/UX and accessibility
- Deploy full stack to live environment

---

## 📸 Screenshots / Demos

(Add screenshots or animated GIFs here once available)

---

## 📝 License

This project is licensed under the MIT License.