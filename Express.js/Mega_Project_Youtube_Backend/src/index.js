// src/index.js
import dotenv from "dotenv";
import path from "path"; 

dotenv.config({ path: path.resolve("./.env") }); // now path.resolve works

import connectDB from "./db/index.js";
import { app } from "./app.js";

export const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("ERRR", err);
      throw err;
    });
    app.listen(PORT || 8000, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Oops: Database connection failed", err);
  });
