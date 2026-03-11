const fs = require("fs");
const path = require("path");

const files = ["file1.txt", "file2.txt", "file3.txt"];
console.log();

const readFilesSequentially = (files, index = 0) => {
  if (index >= files.length) return;
  const filePath = path.join(__dirname, files[index]);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error: ${files[index]}: ${err.message}`);
    }
    console.log(`Content of ${files[index]}:`);
    console.log(data);
    
    readFilesSequentially(files, index + 1);
  });
}

readFilesSequentially(files);
