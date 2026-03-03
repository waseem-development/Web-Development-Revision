import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js";
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const connectionInstance = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    console.log(
      `MongoDB connected Successfully ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error(`Failed to connect to MongoDB ${error}`);
    process.exit(1);
  }
};

export default connectDB;