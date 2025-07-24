// this is just a play around with js
console.log("hello world");

let username_one = prompt(`enter your name`);
console.log(typeof username_one);
let username_two = prompt(`enter your partner name`);
console.log(typeof username_two);
if (username_one === "") {
  username_one = "chuks";
}
if (username_two === "") {
  username_two = "amara";
}

const rand = Math.floor(Math.random() * 100);
console.log(rand);
if (rand < 0 && rand <= 30) {
  alert(`${username_one} vs ${username_two} not compitble`);
} else if (rand >= 30 && rand <= 55) {
  alert(`${username_one} vs ${username_two} are manegble`);
} else if (rand >= 55 && rand <= 85) {
  alert(`${username_one} vs ${username_two} are compitable`);
} else {
  alert("perfect match");
}
