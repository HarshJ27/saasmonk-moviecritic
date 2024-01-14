import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config();

app.use(cors(
  {
    origin: ["https://saasmonk-moviecritic-frontend.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }
));

app.use(fileUpload());
app.use(express.json());


const PORT = 8001;

// Database connect
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

import moviesController from './Controllers/MoviesController.js';

app.use("/api/v1/moviecritic", moviesController);

app.get("/", (req, res) => {
  res.send("Hello SaasMonk!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
