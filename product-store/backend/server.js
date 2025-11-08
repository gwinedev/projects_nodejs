// Entry point for our API
// You can make express type a module so you can import instead of require it
import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching data", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
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

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updatung product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: `Product with id: ${id} deleted` });
  } catch (error) {
    console.error("Error in deleting product", error.message);

    res
      .status(404)
      .json({ success: false, message: `Product with id: ${id} not found` });
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}...`);
});

//mongodb+srv://gwinedev_db_user:qUFddZhDAXP9YBOf@cluster0.j1ajq1d.mongodb.net/?appName=Cluster0
