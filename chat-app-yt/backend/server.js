import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth.routes.js";

const app = express();

dotenv.config();

// middlewares
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
