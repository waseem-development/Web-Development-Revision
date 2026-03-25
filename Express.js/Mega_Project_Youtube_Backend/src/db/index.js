// src/db/index.js
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment
    let mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    
    // Trim whitespace
    mongoURI = mongoURI.trim();
    
    console.log("🔍 Checking MongoDB URI format...");
    console.log(`   Starts with: ${mongoURI.substring(0, 20)}...`);
    
    // Validate URI format
    if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
      throw new Error(`Invalid URI format. Must start with mongodb:// or mongodb+srv://`);
    }
    
    // Check if database name is already in the URI
    let finalURI;
    if (mongoURI.includes('/' + DB_NAME) || mongoURI.endsWith('/' + DB_NAME)) {
      // Database name already in URI, use as is
      finalURI = mongoURI;
      console.log(`📁 Using URI with database name: ${DB_NAME}`);
    } else {
      // Append database name
      finalURI = `${mongoURI}/${DB_NAME}`;
      console.log(`📁 Appending database name: ${DB_NAME}`);
    }
    
    // Hide password in logs
    const safeURI = finalURI.replace(/:([^:@]+)@/, ':*****@');
    console.log(`🔗 Connecting to: ${safeURI}`);
    
    // Connect to MongoDB
    const connectionInstance = await mongoose.connect(finalURI);
    
    console.log(`\n✅ MongoDB connected successfully!`);
    console.log(`   Host: ${connectionInstance.connection.host}`);
    console.log(`   Database: ${connectionInstance.connection.name}`);
    console.log(`   Connection state: ${connectionInstance.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    return connectionInstance;
  } catch (error) {
    console.error("\n❌ MongoDB connection error:");
    console.error(`   Message: ${error.message}`);
    
    // Provide helpful error messages
    if (error.message.includes('bad auth')) {
      console.error(`   → Invalid username or password. Check your credentials.`);
    } else if (error.message.includes('ENOTFOUND')) {
      console.error(`   → Cannot reach MongoDB Atlas. Check your network connection and cluster name.`);
    } else if (error.message.includes('Invalid scheme')) {
      console.error(`   → Invalid connection string format. Make sure it starts with mongodb+srv://`);
    }
    
    throw error;
  }
};

export default connectDB;