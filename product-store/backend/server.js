// Entry point for our API
// You can make express type a module so you can import instead of require it
import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}...`);
});

//mongodb+srv://gwinedev_db_user:qUFddZhDAXP9YBOf@cluster0.j1ajq1d.mongodb.net/?appName=Cluster0
