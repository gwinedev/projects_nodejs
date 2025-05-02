const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://gwine:elmagnific0@todo-app.89cig.mongodb.net/book-library?retryWrites=true&w=majority&appName=todo-app"
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});

db.once("open", () => {
  console.log("Connected to database...");
});

module.exports = db;
