import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";

const app = express();

dotenv.config();
app.use(express.json()); //Parse info from req.body
app.use(cookieParser());
// middlewares
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
