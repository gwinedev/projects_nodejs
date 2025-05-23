const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const mongoose = require("./config/db");
const PORT = process.env.PORT || 5001;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

// create a new MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Test Connection
async function testConnection() {
  try {
    // Connect the client to the server
    await client.connect();

    // create book collection inside a DB
    const bookCollections = client.db("BookInventory").collection("books");

    // Insert a book to the db using post method
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    // get all books from db
    app.get("/all-books", async (req, res) => {
      const books = bookCollections.find();
      const result = await books.toArray();
      res.send(result);
    });

    // get a book
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    });

    // update a book
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBook = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...updatedBook,
        },
      };
      const result = await bookCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // delete a book
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    // find by category
    app.get("/all-book", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
        console.log(query);
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
}

testConnection().catch(console.dir);

app.listen(PORT, () => {
  console.log(`This server is listening on port ${PORT}`);
});
