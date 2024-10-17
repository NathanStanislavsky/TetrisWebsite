import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Use `import` for dotenv
import navigationRoutes from './routes/navigation.js'; // Import with `.js` extension
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

// Use the navigation routes
app.use("/api/navigation", navigationRoutes);

// Connect to the database
mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log("App connected to database");

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to the database:", error);
    });