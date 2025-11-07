// Entry point for our API
// You can make express type a module so you can import instead of require it
import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server is ready" });
});

app.post("/api/products", async (req, res) => {
  //   console.log(req.body);

  const product = req.body;
  //   console.log(product.price);

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(("Error in creating product: ", error.message));
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}...`);
});

//mongodb+srv://gwinedev_db_user:qUFddZhDAXP9YBOf@cluster0.j1ajq1d.mongodb.net/?appName=Cluster0
