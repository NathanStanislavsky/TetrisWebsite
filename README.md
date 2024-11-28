# TetrisWebsite

## Overview

The TetrisWebsite project is a full-stack web application that recreates the classic Tetris game experience. The application includes:

- A responsive **frontend** built with modern JavaScript frameworks.
- A **backend API** for handling game logic, user scores, and leaderboard functionality.
- A **MongoDB** database for persistent leaderboard storage.

The project is containerized using Docker Compose to simplify deployment and ensure consistency across environments.

---

## Features

- **Play Tetris**: Fully functional Tetris game with smooth gameplay and animations.
- **Leaderboard**: Tracks and displays high scores.
- **Responsive Design**: Optimized for desktop.
- **Containerized Setup**: Easily run and deploy the application using Docker.

---

## Project Structure

```plaintext
TetrisWebsite/
├── backend/               # Backend application code
│   ├── controllers/       # API controllers for backend logic
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   ├── Dockerfile         # Dockerfile for the backend service
│   ├── index.js           # Entry point for the backend application
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend-specific documentation
├── frontend/              # Frontend application code
│   ├── src/               # Source files for the frontend
│   │   ├── components/    # Reusable React components
│   │   ├── game/          # Game logic and components
│   │   ├── pages/         # Page-level components
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # Frontend entry point
│   │   └── index.css      # Global styles
│   ├── dist/              # Build output for the frontend
│   ├── Dockerfile         # Dockerfile for the frontend service
│   ├── babel.config.js    # Babel configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── vite.config.js     # Vite configuration for development
│   └── README.md          # Frontend-specific documentation
├── docker-compose.yml     # Docker Compose configuration
├── README.md              # Project documentation (you are here)
└── .gitignore             # Files to be ignored by Git
```

---

## Technologies Used

### Frontend

- **Framework**: React.js (or specify your frontend framework)
- **Styling**: Tailwind CSS

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB

### Tools & Infrastructure

- **Containerization**: Docker & Docker Compose
- **Deployment**: Compatible with Vercel
- **Version Control**: GitHub

---

## Getting Started

### Prerequisites

Ensure the following are installed:

- Docker and Docker Compose
- (Optional) Node.js and npm if running locally

### Setup

1. Clone the Repository:

   ```bash
   git clone https://github.com/<your-username>/TetrisWebsite.git
   cd TetrisWebsite
   ```

## Docker

- To run using Docker, use the command: `docker compose up -d`
- To stop containers, use: `docker-compose stop`
- To bring down everything, use: `docker-compose down --volumes`

### Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:5050](http://localhost:5050)

### Frontend

To run the frontend locally:

```bash
cd frontend
npm install
npm start
```

### Backend

To run the backend locally:

```bash
cd backend
npm install
npm run dev
```

