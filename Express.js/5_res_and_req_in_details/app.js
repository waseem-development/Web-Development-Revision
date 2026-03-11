import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const users = [];

app.get("/", (req, res) => {
  console.log(req.url);
  console.log(req.method);
  res.send("Welcome to the Home Page");
});

app.get("/api/info", (req, res) => {
  try {
    const url = req.url;
    const method = req.method;
    const ip = req.ip;
    const header = req.headers["user-agent"];
    console.log(url);
    console.log(method);
    console.log(ip);
    console.log(header);
    res.status(200).json({
      success: "true",
      method: "get",
      end: "/api/info",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Getting JSON");
  }
});

app.use(express.json());

app.post("/api/users", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({
      success: false,
      message: "Name and age are required",
    });
  }
  const newUser = { id: users.length + 1, name, age }; // auto id
  users.push(newUser);

  return res.status(201).json({
    success: true,
    message: "Name and age acquired",
    users,
  });
});

app.get("/api/users", (req, res) => {
  return res.status(200).json({
    success: true,
    users,
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id); // convert param to number
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    user, // return the found user
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost/${PORT}`);
});
