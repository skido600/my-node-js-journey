//The terms end() and send() are commonly used in Node.js HTTP servers
const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Welcome ");
  res.write("to Node.js!");
  res.end(); //  Finalize the response
});

server.listen(3000);
