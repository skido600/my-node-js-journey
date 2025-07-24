# File Stream Example in Node.js

This demonstrates how to copy the contents of one file to another using **streams** in Node.js.

## 📁 Files

- `stream.txt` → The source file containing the original text.
- `txt.txt` → The destination file where the copied content will be written.

## 📜 Code Explanation

```js
const fs = require("fs");
const path = require("path");

const readme = fs.createReadStream(path.join(__dirname, "stream.txt"));
const writeme = fs.createWriteStream(path.join(__dirname, "txt.txt"));

readme.pipe(writeme);
```

# Rename a File in Node.js

This guide shows how to rename a file in Node.js using both **asynchronous** and **synchronous** methods with the built-in `fs` module.

---

## 📁 Example Files

Assume you have a file named `write.json` in your project folder.

---

## ✏️ 1. Rename File (Asynchronous)

This method uses `fs.rename()` with a callback function:

```js
const fs = require("fs");
const path = require("path");

const oldPath = path.join(__dirname, "write.json");
const newPath = path.join(__dirname, "newName.txt");

fs.rename(oldPath, newPath, (err) => {
  if (err) {
    console.error("Error renaming file:", err.message);
  } else {
    console.log("File renamed successfully");
  }
});
```

append file

const fs = require('fs');
const path = require('path');

const filePath = path.join(\_\_dirname, 'log.txt');

fs.appendFile(filePath, 'New log entry\n', (err) => {
if (err) {
console.error('Error appending to file:', err.message);
} else {
console.log('Content appended to file');
}
});
