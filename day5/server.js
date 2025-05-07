const fs = require("fs"); // Built-in module to work with files
const path = require("path"); // Helps with file paths

// Create a readable stream from index.txt
const read = fs.createReadStream(path.join(__dirname, "index.txt"), {
  encoding: "utf-8", // So you get readable text instead of raw bytes
});

// When the stream sends a data chunk, this runs
read.on("data", (chunk) => {
  console.log(chunk); // Log that chunk of text
});

// When there is no more data to read, this runs
read.on("end", () => {
  console.log("reading ends");
});

// If something goes wrong (file not found, etc.), this runs
read.on("error", (error) => {
  console.log("Error:", error.message);
});

//let create a stream and join it to readble stream

const readme = fs.createReadStream(path.join(__dirname, "stream.txt"));
const writeme = fs.createWriteStream(path.join(__dirname, "txt.txt"));

readme.pipe(writeme);

// const oldPath = path.join(__dirname, "txt.txt");
// const newPath = path.join(__dirname, "keep.txt");

// fs.rename(oldPath, newPath, (err) => {
//   if (err) {
//     console.error("Error renaming file:", err.message);
//   } else {
//     console.log("File renamed successfully");
//   }
// });
const filePath = path.join(__dirname, "stream.txt");
const textFilePath = path.join(__dirname, "txt.txt");

// fs.appendFile(filePath, " \n New log entry\n", (err) => {
//   if (err) {
//     console.error("Error appending to file:", err.message);
//   } else {
//     console.log("Content appended to file");
//   }
// });

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }

  fs.appendFile(textFilePath, data, (err) => {
    err ? console.log(err.message) : console.log("win");
  });
});
