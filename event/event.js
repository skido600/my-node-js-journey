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

//create a logger

const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

//dir
const logdir = path.join(process.cwd(), "logger");
const test = path.join(logdir, "logger.txt");

//check if exist
if (!fs.existsSync(logdir)) {
  fs.mkdirSync(logdir);
}

// call the instance of event
const myEmitter = new EventEmitter();

myEmitter.on("log", (msg) => {
  const date = new Date().toISOString();
  const logMessage = `${date} - ${msg}\n`;
  try {
    fs.appendFileSync(test, logMessage);
    console.log("Logged:", msg);
  } catch (err) {
    console.error(err.message);
  }
});

//i can export as module and use to show messages
function logMessage(msg) {
  myEmitter.emit("log", msg);
}

//exapmle writing file to day2 folder
const dayfolder = path.join(process.cwd(), "..", "day2");
const day2text = path.join(dayfolder, "day2text.txt");

fs.writeFile(day2text, "testing node fs", (err) => {
  if (err) {
    logMessage(chalk.red(err.message));
  }
  logMessage(chalk.green("successfully written file"));
});

//let read file written
fs.readFile(day2text, "utf-8", (err, data) => {
  if (err) {
    logMessage(chalk.red(err.message));
  }
  logMessage(chalk.green(data));
});
