// ==========================================
// FILE: src/db/index.js
// ==========================================
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
 
const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;
 
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
 
    mongoURI = mongoURI.trim();
 
    if (
      !mongoURI.startsWith("mongodb://") &&
      !mongoURI.startsWith("mongodb+srv://")
    ) {
      throw new Error(
        "Invalid URI format. Must start with mongodb:// or mongodb+srv://"
      );
    }
 
    // Append DB name only if it's not already in the URI
    const finalURI =
      mongoURI.includes("/" + DB_NAME) || mongoURI.endsWith("/" + DB_NAME)
        ? mongoURI
        : `${mongoURI}/${DB_NAME}`;
 
    const safeURI = finalURI.replace(/:([^:@]+)@/, ":*****@");
    console.log(`\n🔗 Connecting to MongoDB: ${safeURI}`);
 
    const connectionInstance = await mongoose.connect(finalURI);
 
    console.log(`✅ MongoDB connected!`);
    console.log(`   Host: ${connectionInstance.connection.host}`);
    console.log(`   Database: ${connectionInstance.connection.name}`);
 
    return connectionInstance;
  } catch (error) {
    console.error("\n❌ MongoDB connection error:", error.message);
 
    if (error.message.includes("bad auth")) {
      console.error("   → Invalid credentials. Check MONGODB_URI.");
    } else if (error.message.includes("ENOTFOUND")) {
      console.error(
        "   → Cannot reach MongoDB Atlas. Check network/cluster name."
      );
    } else if (error.message.includes("Invalid scheme")) {
      console.error(
        "   → Invalid connection string. Must start with mongodb+srv://"
      );
    }
 
    throw error;
  }
};
 
export default connectDB;