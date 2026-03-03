require("dotenv").config();
const fs = require("fs").promises; // Use promises version
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const productPath = path.join(__dirname, "./data/products.txt");
const usersPath = path.join(__dirname, "./data/users.txt");
const files = [
  { fileName: "products.txt", filePath: productPath },
  { fileName: "users.txt", filePath: usersPath },
];

const server = app.get("/", async (req, res) => {
  try {
    const result = [];
    const url = req.url;
    const method = req.method;
    const requestPath = req.path;
    const requestHeaders = req.headers;
    const requestQuery = req.query;
    const requestParameters = req.params;
    const requestBody = req.body;
    const requestCookies = req.cookies;
    const requestIP = req.ip;
    console.log("url =", url);
    console.log("method =", method);
    console.log("Path =", requestPath);
    console.log("requestParameters =", requestParameters);
    console.log("requestCookies =", requestCookies);
    console.log("requestIP =", requestIP);
    console.log("req.get('content-type') =", req.get("content-type"));
    console.log("requestHeaders =", JSON.stringify(requestHeaders, null, 2));
    console.log("requestQuery =", JSON.stringify(requestQuery, null, 2));
    console.log("requestBody =", JSON.stringify(requestBody, null, 2));
    // for...of allows await
    for (const file of files) {
      const data = await fs.readFile(file.filePath, "utf8");
      const lines = data.split("\n").length;
      result.push({
        fileName: file.fileName,
        lines,
        content: data.split("\n"),
      });
      console.log(result);
    }
    res.json({ files: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading files");
  }
});
server.listen(PORT, () => {
  console.log(`You server is running on PORT=${PORT}`);
});
