// before all this for you to automatically start without manually  doing node server watch it by doing node --watch server

// In Node.js, there’s no import by default like in the browser — instead, you use:
// const something = require("something");

//  There are two types of modules:
// 1 Built-in (or Core) Modules
// 2 User-defined (or Custom/Local) Modules

// user defined module

function add(a, b) {
  return a + b;
}

function mutiple(a, b) {
  return a * b;
}
module.exports = { add, mutiple };
