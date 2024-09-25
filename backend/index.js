import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome")
});

mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log("App connected to database");

        app.listen(process.env.PORT, () => {
            console.log(`App is listening to: ${process.env.PORT}`);
        })
    })
    .catch(() => {
        console.log(error);
    });