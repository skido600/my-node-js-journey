// exploring os module using chalk to display colors
import chalk from "chalk";
import os from "os";

const username = os.userInfo().username;
const uptimeMinutes = Math.floor(os.uptime() / 60);
const totalMemGB = (os.totalmem() / 1024 ** 3).toFixed(2);
const freeMemGB = (os.freemem() / 1024 ** 3).toFixed(2);

const isMemoryLow = parseFloat(freeMemGB) < parseFloat(totalMemGB) / 2;

console.log(
  chalk.blue(
    `Hey ${username}, you have been online on this machine for ${uptimeMinutes} minutes.`
  )
);

console.log(
  chalk.yellow(
    `Total Memory: ${totalMemGB} GB and Free Memory: ${freeMemGB} GB`
  )
);

if (isMemoryLow) {
  console.log(chalk.red(`FREE UP SPACE: MEMORY LOW (less than half RAM free)`));
} else {
  console.log(chalk.green(` SUFFICIENT SPACE for ${username}`));
}
