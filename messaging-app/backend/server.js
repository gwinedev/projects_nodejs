import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
dotenv.config({ quiet: true });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
