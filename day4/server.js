// Today we will be talking about writing and reading files,
// and also about the `path` module in Node.js.

const fs = require("fs");
const path = require("path");

// ✅ What is fs?
// fs stands for File System. It's a built-in Node.js module
// that lets you work with files and folders — just like a text editor,
// but with code!

// ✅ fs.writeFile
// This method is used to write content to a file.
// It takes 3 arguments:
// - file: the name or path of the file
// - data: the content to write
// - callback: a function that runs after writing is done

// Example:
fs.writeFile(
  path.join(__dirname, "day4.txt"),
  "This is coming from day4 — just testing writeFile!",
  (err) => {
    if (err) {
      console.log("❌ Error writing file:", err);
      return;
    }
    console.log("✅ File created and written successfully!");
  }
);

// 📁 About path:
// The `path` module helps us build file paths in a way that works
// across all operating systems (Windows, macOS, Linux).
// Using `path.join()` ensures we don’t accidentally mess up folder paths.
// this path.join mean example i will look like  day4/day4.txt
