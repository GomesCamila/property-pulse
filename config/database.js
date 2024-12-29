import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //If the database is already connected
  if (connected) {
    console.log("MongoDB is already connected");
    return;
  }

  //Connect to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
