const fs = require("fs");
const path = require("path");

const files = ["file1.txt", "file2.txt", "file3.txt"];

// Function that reads a file and returns a Promise
const readFilesAndCountWords = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const readAllFiles = async () => {
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(__dirname, files[i]);
    try {
      const data = await readFilesAndCountWords(filePath);
      const wordCount = data.split(/\s+/).filter(Boolean).length;
      console.log(`File: ${files[i]} | Words: ${wordCount}`);
    } catch (err) {
      console.error(`Error reading ${files[i]}:`, err.message);
    }
  }
  console.log("All files processed ✅");
};

readAllFiles().finally(() => {
  console.log("All files processed ✅");
});
