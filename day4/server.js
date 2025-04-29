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
// fs.writeFile(
//   path.join(__dirname, "day4.txt"),
//   "This is coming from day4 — just testing writeFile!",
//   (err) => {
//     if (err) {
//       console.log("❌ Error writing file:", err);
//       return;
//     }
//     console.log("✅ File created and written successfully!");
//   }
// );

// ✅ fs.readFile
// This method is used to read the contents of a file asynchronously.
// It takes 3 arguments:
// - file: the file path
// - encoding: usually "utf-8" to convert buffer to text
// - callback: a function with two parameters: error and data

// By default, the data is returned as a buffer (binary format).
// To convert it to readable text, we specify "utf-8" or use toString().

// fs.readFile(path.join(__dirname, "day4.txt"), "utf-8", (error, data) => {
//   if (error) return console.log("❌ Error reading file:", error);
//   console.log("📄 File content:", data);
// });

// console.log("✅ hello");

// ✅ fs.readFileSync
// This method reads the file synchronously — meaning the program will
// wait (block) until the file is completely read before moving on.

// let data = fs.readFileSync(path.join(__dirname, "day4.txt"), "utf-8");
// console.log("📄 Sync read:", data);

// ✅ Understanding sync vs async:
// If we use fs.readFile (async), Node.js will not wait — it keeps running other code.
// If we use fs.readFileSync (sync), it will pause and wait until the file is read.

// ✅ About the path module:
// The `path` module helps us build file paths that work on all operating systems.
// Using `path.join()` prevents issues like using the wrong slashes (e.g. `\` on Windows, `/` on Mac/Linux).
// Example:
// path.join("day4", "day4.txt") => "day4/day4.txt" (or "day4\\day4.txt" on Windows)

// first pratice write data to json file

try {
  const write = fs.writeFileSync(
    path.join(__dirname, "data2.json"),
    JSON.stringify(
      {
        article:
          "This repository contains my personal journey as I learn and explore Node.js. It includes various experiments and lessons that I’ve worked on to understand the core concepts of Node.js.",
      },
      null,
      3
    )
  );
} catch (error) {
  console.log("Error writing file:", error);
}
