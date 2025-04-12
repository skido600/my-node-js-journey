// importing custom defined module

// distructioning way of importing👏
const { add, mutiple } = require("./module");

console.log(add(2, 3));
console.log(mutiple(2, 3));

// You are importing the entire module as a single object called👏
const math = require("./module");

console.log(math.add(1, 1));
console.log(math.mutiple(2, 1));
