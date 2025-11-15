import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Database connected...");
  } catch (error) {
    console.error("Error in connecting to MongoDB", error.message);
    process.exit(1);
  }
};

export default connectDB;
