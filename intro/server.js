// These are variables you can use anywhere in your Node.js file, like:

// __dirname → Shows the folder path

// __filename → Shows the full file path

// console.log() → Logs things

// setTimeout() → Runs code after a delay

console.log(__dirname);
console.log(__filename);

setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);

// In Node.js, global objects are variables or functions that are always available — you can use them anywhere without importing anything.

// to check global
console.log(global);

// you will see fetch but is not avalible in new node version
