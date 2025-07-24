//created http server
const fs = require("fs");
const path = require("path");
const port = 3001;

const http = require("http");

const file = fs.readFileSync("./file.txt", "utf-8");

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.end("this is home page");
  } else if (req.url === "/file") {
    res.end(file);
  } else {
    res.end("404 page");
  }
});

server.listen(port, () => {
  console.log(`server is running ${port}`);
});
