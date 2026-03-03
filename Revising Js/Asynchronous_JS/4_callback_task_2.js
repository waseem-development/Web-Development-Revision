const fs = require("fs");
const path = require("path");

const files = ["file1.txt", "file2.txt", "file3.txt"];

const readFilesAndCountWords = ((files, index = 0) => {
    if (index >= files.length) return;

    const filePath = path.join(__dirname, files[index]);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(`Error: ${files[index]}: ${err.message}`);
            return;
        }
        console.log(`Content of ${files[index]}`);
        const words = data.split(/\s+/).filter(Boolean).length;
        console.log(`Words Count: ${words}`);
        console.log(data);
        
        readFilesAndCountWords(files, index+1);
    });
})
readFilesAndCountWords(files);