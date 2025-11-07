// Entry point for our API
// You can make express type a module so you can import instead of require it
import express from "express";
import { connectDB } from './config/db.js'

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Server is ready" });
});

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}...`);
});

//mongodb+srv://gwinedev_db_user:qUFddZhDAXP9YBOf@cluster0.j1ajq1d.mongodb.net/?appName=Cluster0
