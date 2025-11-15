import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDB.js";
import myRouter from "./routes/auth.route.js";

const app = express();
dotenv.config({ quiet: true });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

app.use("/api", myRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
