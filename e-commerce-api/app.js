const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("./config/database");

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
