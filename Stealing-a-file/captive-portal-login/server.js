const http = require("http");
var ip = require("ip");

// const hash = function (string) {
//   //set variable hash as 0
//   var hash = 0;
//   // if the length of the string is 0, return 0
//   if (string.length == 0) return hash;
//   for (i = 0; i < string.length; i++) {
//     ch = string.charCodeAt(i);
//     hash = (hash << 5) - hash + ch;
//     hash = hash & hash;
//   }
//   return hash;
// };

const validCode = function (code) {
  if (code === "HJ2K") return true;
  return false;
};

const requestListener = function (req, res) {
  // const ip = req.headers["x-forwarded-for"] || req.socket.localAddress || null;
  console.log(ip.address());
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    // end of data
    const code = JSON.parse(data).code;
    console.log("code: " + code);
    if (validCode(code)) {
      res
        .writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        })
        .end(
          JSON.stringify({
            message: `${code} is the correct code!`,
            acceptFormHTML: `<form id="acceptForm" method="POST" action="http://10.0.0.1:5280/" class="anim delay4">
            <input type="hidden" name="mode_login">
            <input type="hidden" name="redirect" value="$redirect">
            <input type="hidden" name="accept_terms" value="yes">
            <button id="acceptBtn" class="btn btn-primary" type="submit" value="Submit"><i class="icon-check"></i> Ok, I Agree!</button>`,
          })
        );
    } else {
      res
        .writeHead(401, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        })
        .end(JSON.stringify({ message: `Wrong access code (${code})` }));
    }
  });
};

const server = http.createServer(requestListener);
server.listen(8081);
