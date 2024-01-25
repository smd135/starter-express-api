import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import routesRoute from './routes/routes.js'


const app = express();
dotenv.config();

// Constants
const port = process.env.port || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(express.json());
app.use(cors());

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.idtz4it.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    );
    console.log("DB connected successfully");
  } catch (err) {
    console.log(`DB connection failed ${err}`);
  }
}

// Routes
app.use("/api/auth", authRoute);
app.use("/api/routes", routesRoute);


start();
app.listen(5000, () => {
  console.log(`Server started on port ${port}`);
});
