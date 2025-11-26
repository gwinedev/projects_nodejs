import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/connectDB.js";
import authRoute from "./routes/auth.routes.js";

const app = express();

dotenv.config();
app.use(express.json()) //Parse info from req.body

// middlewares
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
