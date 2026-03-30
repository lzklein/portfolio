# 🌐 Portfolio Website & Tower Defense Game

**Full Stack Project** • React Frontend | Spring Boot Backend

This repository contains my personal **portfolio website**, featuring an integrated **tower defense game**, a **custom backend API**, and a fully deployed production environment. The project demonstrates end-to-end ownership of a modern web application, including development, security, and infrastructure.

---

## 🚀 Overview

This project showcases the ability to design, build, and deploy a full-stack application with real-world considerations such as:

- Secure API design  
- Abuse prevention (rate limiting, CAPTCHA, honeypotting)  
- Deployment and networking (DNS, reverse proxy, tunneling)  
- Persistent backend data handling  

---

## 🧠 Backend — API & Services

The backend is built with **Spring Boot (Java)** using an MVC architecture and includes unit testing at the service layer.

**Folder structure:**

server/highscore/  
- src/main/java/...          (Controllers, Services, Models)  
- src/test/java/...          (Unit tests)  
- resources/data.csv  (Top 5 scores)  

### Core Functionality

- REST API for:
  - High score retrieval  
  - Score submission  
  - Automatic leaderboard sorting  
- CSV lightweight storage  
- unit testing with JUnit  

---

### 📧 Email Service API

A custom backend service handles contact form submissions from the frontend.

**Features:**
- Accepts user input via API  
- Sends email through configured service  

**Security:**
- reCAPTCHA verification  
- Rate limiting (prevents spam/abuse)  
- Honeypot field for bot detection  

---

## 🖥️ Frontend — Portfolio + Game

The frontend is built with **React (Create React App)**.

**Folder structure:**

client/src/
- assets/       (files, images, etc.)  
- components/   (React components)  
- hooks/        (Custom hooks)  
- style/        (CSS)  

### Portfolio Pages

- About Me  
- Projects  
- Resume  
- Contact  
- Tower Defense Game (WIP)  

---

## 🕹️ Tower Defense Game (WIP)

An in-progress game built directly in React with a focus on performance and real-time updates.

### Implemented Features

- **Towers**
  - Multiple types with unique mechanics  
  - Piercing, AoE, slowing, chain lightning  

- **Enemies**
  - Variable health, speed, and damage  

- **Game Board**
  - Expandable columns  
  - Wave-based system  

- **Wave System**
  - Prebuilt enemy groups  
  - Scaling difficulty  

- **Challenge Modifiers**
  - Optional wave modifiers (checkbox-based)  
  - Reward system planned  

---

### ⚙️ Architecture Notes

- Uses `useRef` for game state to avoid unnecessary re-renders  
- Custom game loop logic implemented in React  
- Designed for performance over traditional React state patterns  

---

### 🔗 Backend Integration

- High score submission via API  
- Persistent leaderboard storage  
- Automatic top 5 ranking  

---

## 🌍 Deployment & Infrastructure

Frontend (Vercel - static hosting)  
   ↓  
louisklein.dev  
   ↓  
Cloudflare (DNS, SSL termination, proxy)  
   ↓  
Cloudflared Tunnel (secure ingress)  
   ↓  
Nginx (reverse proxy / request routing)  
   ↓  
Spring Boot backend (self-hosted API)  

### Infrastructure Details

- **Frontend Hosting:** Vercel (static React build)  
- **Backend Hosting:** Self-hosted server  
- **DNS & Security:** Cloudflare  
- **Secure Routing:** Cloudflared tunnel / reverse proxy  
- **Build Tooling:** Maven (backend), npm (frontend)  

---

## 🔐 Security Features

- Rate limiting on API endpoints  
- Google reCAPTCHA integration  
- Honeypot anti-bot strategy  
- Backend not directly exposed to public internet  
- Requests routed through secure proxy/tunnel  

---

## 🚀 Local Development

### Backend
cd server/highscore  
mvn clean install  
mvn spring-boot:run  

Runs on: http://localhost:8080  

---

### Frontend
cd client  
npm install  
npm start  

Runs on: http://localhost:3000  

---

## 🧪 Project Status

| Area                           | Status                       |
|--------------------------------|------------------------------|
| Backend high score API         | ✅ Functional                |
| Email service + security       | ✅ Functional                |
| Portfolio pages (React)        | ✅ Functional                |
| Tower defense mechanics        | ⚠️ WIP (debug mode)          |
| Game ↔ backend integration     | ⚠️ Partial                   |
| Deployment (full stack)        | ✅ Live                      |

---

## 🧰 Tech Stack

- **Frontend:** React, JavaScript  
- **Backend:** Spring Boot, Java  
- **Testing:** JUnit  
- **Data Storage:** CSV (leaderboard)  
- **Infrastructure:** Vercel, Cloudflare, Cloudflared, Nginx
- **Build Tools:** Maven, npm  

---

## 📈 What This Project Demonstrates

- Full-stack application development and deployment  
- API design and backend service architecture  
- Real-world security practices (rate limiting, CAPTCHA)  
- Networking and infrastructure knowledge (DNS, proxies, tunnels)  
- Performance-aware frontend engineering  
- Building interactive applications with persistent backend data  

---

## 📌 Future Improvements

- Complete tower defense gameplay loop (mouse interaction, UI polish)  
- Refactor TD game code into clean sections
- Expand backend beyond CSV (database integration -> MongoDB maybe)  
- Create mobile mode
- Add more interactive portfolio projects  

---

## 📬 Live Site

https://louisklein.dev  

---

## 📝 License

This project is licensed under the MIT License.
