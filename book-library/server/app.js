const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const port = 3001;
const db = require("./db");
const jwt = require("jsonwebtoken");

const Book = require("./bookModel");
const User = require("./userModel");
const roles = require("./roles");
app.use(express.json());

// Register a auser
app.post("/api/register", (req, res) => {
  const user = new User({ ...req.body, role: "user" });
  user
    .save()
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
    });
});

// Login user
app.post("/api/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign({ userId: user._id }, "secretKey", {
              expiresIn: "1h",
            });
            res.json({ token });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error logging in user" });
    });
});

// Register admin
app.post("/api/admin/register", (req, res) => {
  const secretKey = req.header("secretKey");
  if (secretKey !== "mySecretKey") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const user = new User({ ...req.body, role: "admin" });
  user
    .save()
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error registering admin user" });
    });
});

// Login admin
app.post("/api/admin/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else if (user.role !== "admin") {
        res.status(401).json({ message: "Access denied" });
      } else {
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign({ userId: user_.id }, "secretKey", {
              expiresIn: "24h",
            });
            res.json({ token });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error logging in admin user" });
    });
});

// Protect routes with JWT
app.use((req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ message: "Access denied" });
  } else {
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.user = decoded;
        const userRole = req.user.role;
        const permissions = roles[userRole];
        req.permissions = permissions;
        next();
      }
    });
  }
});

app.get("/", (req, res) => {
  console.log("I am up");
  res.send("Book Library App");
});

app.get("/api/books", (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching book" });
    });
});

// Create a book
app.post("/api/books", (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then((newBook) => {
      res.json(newBook);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating book" });
    });
});

// Get a book by ID
app.get("/api/books/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: "Bok not found" });
      } else {
        res.json(book);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching book" });
    });
});

// Update a book (requires authentication)
app.put("/api/books/:id", (req, res) => {
  if (!req.permissions.canUpdateBooks) {
    res.status(401).json({ message: "Access denied" });
  } else {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedBook) => {
        if (!updatedBook) {
          res.status(404).json({ message: "Book not found" });
        } else {
          res.json(updatedBook);
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Error updating book" });
      });
  }
});

// Delete a book
app.delete("/api/books/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.json(book);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting book" });
    });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
