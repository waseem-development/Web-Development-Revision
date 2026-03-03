import express from "express";
import dotenv from "dotenv";
import {fs, fsSync} from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, "./data/products.txt");
const usersPath = path.join(__dirname, "./data/users.txt");

const files = [
  { fileName: "products.txt", filePath: productsPath },
  { fileName: "users.txt", filePath: usersPath },
];

app.get("/", (req, res) => {
  try {
    const url = req.url;
    const method = req.method;
    console.log(url);
    console.log(method);

    res.send(`
            <h1 style="
            font-family: Arial, Helvetica, sans-serif;
            font-size: 3rem;
            color: #2c3e50;
            text-align: center;
            margin-top: 20vh;
            letter-spacing: 1px;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
            ">
            Welcome to the Home Page
            </h1>
            `);
  } catch (error) {
    console.error(error);
    res.status(500).send("No such tab exists");
  }
});

app.get("/files", async (req, res) => {
  try {
    const result = [];
    const url = req.url;
    const method = req.method;
    console.log(url);
    console.log(method);

    for (const file of files) {
      const data = await fs.readFile(file.filePath, "utf8");
      const newResponse = {
        fileId: result.length + 1,
        fileName: file.fileName,
        content: data.split("\n"),
      };
      result.push(newResponse);
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.get("/downloads/products", (req, res) => {
  if (!fsSync.existsSync(productsPath)) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }

  res.download(productsPath, "products.txt");
});

app.use((req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url);
  console.log(method);
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.listen(PORT, () => {
  console.log(`Your server is running at ${PORT}`);
});
