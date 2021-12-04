import io from "socket.io-client";
import readline from "readline";

const COLOR = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

const colorLog = (color) => (string) =>
  `${COLOR[color]}${COLOR["fgBlack"]}${string}${COLOR.reset}`;

const red = colorLog("bgRed");
const blue = colorLog("bgBlue");
const green = colorLog("bgGreen");
const yellow = colorLog("bgYellow");
const magenta = colorLog("bgMagenta");
const cyan = colorLog("bgCyan");

const log = (message, color = "reset", linebreak = true) => {
  console.log(
    `${COLOR[color]}${message}${COLOR.reset}${linebreak ? "\n" : ""}`
  );
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const [name] = process.argv.slice(2);
const socket = io("http://localhost:3000", {
  auth: {
    resistanceCodeName: name,
  },
});

const showHelp = () => {
  log(`
These are the possible commands in the ${cyan("Bifrost")}:
=============================================================
||                ||                                       ||
||  heimdal help  || Show possible commands in the ${cyan("Bifrost")} ||
||________________||_______________________________________||
||                ||                                       ||
||  heimdal show  || Show all connections to the bifrost   ||
||________________||_______________________________________||
  `);
};

const heimdalCommand = (reply) => {
  switch (reply) {
    case "heimdal help":
      showHelp();
      break;

    case "heimdal show":
      log("function not implemented yet");
      break;

    default:
      break;
  }
  sendMsg();
};

const sendMsg = () => {
  rl.question("> ", (reply) => {
    if (reply.toLowerCase().includes("heimdal")) return heimdalCommand(reply);
    console.log(`Sending message: ${reply}`);
    socket.emit("chat message", `${name} says ${reply}`);
    sendMsg();
  });
};

socket.on("connect", () => {
  console.clear();
  log(`Successfully connected to the ${cyan("Bifrost")}`);

  log(
    `Welcome to the bifrost ${name}, I am Heimdal.
I will deliver your data packages to anyone else 
connected to the bifrost. You can also call on me for help.
Just type "heimdal help" like this`,
    "reset",
    false
  );
  log("heimdal help");
  showHelp();
  sendMsg();
});

socket.on("chat message", (message) => {
  console.log(message);
});

socket.on("disconnect", () => {
  console.log("Connection lost...");
});
