import mongoose from "mongoose";

// Connect to MongoDB database using try catch block
const connectDB = async () => {
  try {
    console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "YES" : "NO");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
