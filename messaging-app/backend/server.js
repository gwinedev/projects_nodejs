import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/connectDB.js";

const app = express();
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
