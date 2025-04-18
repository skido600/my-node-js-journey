// ## creating basic server

// this just a simple serever by default is Get when user check localhost:8000  this is just basic
const http = require("http");
// You're importing Node's built-in HTTP module.
const data = require("./data.json");
const server = http.createServer((req, res) => {
  // This creates a web server.
  // It takes a callback function with two arguments:

  // req	The incoming request
  // res	The outgoing response
  //   res.write("Hello, Leowave! \n");
  // This sends a chunk of data back to the browser.
  // You can call this multiple times if needed. example

  // another method is res.writeHead(statusCode, headers)
  // this take in two argument
  //always remeber to put this befor anything
  res.writeHead(200, { "Content-Type": "application/json" });

  //   res.write("Hello, users!\n");
  //   res.write("Hello, squad! \n");
  res.write(JSON.stringify(data));

  res.end();
  // This finishes the response.
  // Without this, the browser keeps waiting (hanging).
  //you can even use to write to browser
  // the different between this and write is you can user res.write as may you wish but end will only end once
});

server.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
// This tells the server to start listening for requests on port 8000.
// The callback runs once when the server is ready.
