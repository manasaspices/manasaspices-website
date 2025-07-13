import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = mongoose.connection.readyState === 1;
  console.log("Connected to MongoDB.");
};

export default connectDB