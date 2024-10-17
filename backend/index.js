import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import navigationRoutes from './routes/navigation.js'; // Navigation routes
import scoreRoutes from './routes/scores.js';           // Score routes
import cors from 'cors';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Use routes
app.use('/navigation', navigationRoutes);  // Navigation-related routes
app.use('/api', scoreRoutes);                  // Score-related routes

// Connect to the database
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log("App connected to database");
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to the database:", error);
    });