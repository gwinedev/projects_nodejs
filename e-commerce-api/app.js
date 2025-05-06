const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("./config/database");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
