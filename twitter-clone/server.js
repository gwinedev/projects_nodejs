import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

const app = express();
dotenv.config({ quiet: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
  connectDB();
});
