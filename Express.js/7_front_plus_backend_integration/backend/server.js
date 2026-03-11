import express from "express";
import dotenv from "dotenv";
import jokes from "./data/jokes.js";
dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
  try {
    const url = req.url;
    const method = req.method;
    console.log(url);
    console.log(method);
    res.send(`Welcome to the Home Page`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong on the home page");
  }
});

// Jokes route
app.get("/api/jokes", (req, res) => {
  try {
    const url = req.url;
    const method = req.method;
    console.log(url);
    console.log(method);
    res.json({ success: true, jokes });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to load jokes",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
