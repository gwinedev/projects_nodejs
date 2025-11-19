// backend/fix-user-data.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./backend/models/user.model.js"; // Adjust path as needed

// Load environment variables (like MONGO_URI)
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const fixUserData = async () => {
  try {
    if (!MONGO_URI) {
      console.error("FATAL ERROR: MONGO_URI is not defined.");
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully. Starting data cleanup...");

    // This is the Mongoose equivalent of the MongoDB shell command:
    const result = await User.updateMany(
      {
        // Only target users where 'following' is missing or not an array
        // (or you can target all users with just {})
      },
      {
        $set: {
          followers: [],
          following: [],
        },
      }
    );

    console.log(
      `✅ Cleanup successful! Modified ${result.modifiedCount} user documents.`
    );
  } catch (error) {
    console.error("❌ Data Cleanup Failed:", error.message);
  } finally {
    // Always close the connection
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

fixUserData();
