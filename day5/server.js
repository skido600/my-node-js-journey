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
