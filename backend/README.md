# Backend

This is the backend service for the **TetrisWebsite** project. It handles game logic, leaderboard management, and communication with the MongoDB database.

---

## Features

- **API Endpoints**: Provides RESTful APIs for:
  - Adding a score to the leaderboard
  - Getting the leaderboard data
  - Deleting a highscore from the database
  - Getting the smallest score
- **Database Integration**: MongoDB for persistent data storage.
- **Environment Variables**: Utilizes `.env` file 
- **Dockerized**: Employs containerization with Docker

---

## Project Structure

```plaintext
backend/
├── controllers/       # API logic to handle incoming requests
├── models/            # MongoDB schemas and data models
├── routes/            # Application routes for API endpoints
├── .env               # Environment variables (excluded from version control)
├── Dockerfile         # Dockerfile for building the backend service
├── index.js           # Entry point for the backend application
├── package.json       # Backend dependencies and scripts
├── package-lock.json  # Dependency lock file
└── README.md          # Documentation (you are here)
```

## Technologies Used

    •	Runtime: Node.js
    •	Framework: Express.js
    •	Database: MongoDB (via Mongoose)
    •	Environment Management: dotenv
    •	Containerization: Docker

## Endpoints

- By default, the backend runs on http://localhost:5050.

## Routes

1. POST /newScore
   • Purpose: Handles submission of new scores to the leaderboard.
   • Controller Function: submitNewScore
2. GET /scores
   • Purpose: Retrieves the leaderboard data, such as the top scores or all scores stored in the database.
   • Controller Function: getLeaderboardData
3. DELETE /deleteScore
   • Purpose: Deletes a score from the leaderboard.
   • Controller Function: deleteHighScore
4. GET /smallestScore
   • Purpose: Retrieves the smallest score currently on the leaderboard (useful for comparisons or pruning low scores).
   • Controller Function: getSmallestScore

## Environment Variables

Create a .env file in the backend/ folder with the following variables:

```javascript
DB_CONNECTION_STRING=`your-mongodb-connection-string`
PORT=5050
```

## Running the Backend

### Prerequisites
• Install Node.js and npm.
• Ensure MongoDB setup properly and conneciton string is added to environment variables

### Setup

```bash
cd backend
npm install
npm run dev
```
