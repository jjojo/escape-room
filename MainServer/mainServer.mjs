import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors()); // Allows all and everything!
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const __dirname = path.resolve();

let inMemoryState = {
  connected: [],
};

const setState = (state) => {
  inMemoryState = state;
  // console.log("inMemoryState: ", inMemoryState);
};

const addConnected = ({ state, connection }) =>
  setState({
    ...state,
    connected: [...state.connected, connection],
  });

const removeConnected = () => {
  // setState({
  //   ...inMemoryState,
  //   connected: inMemoryState.connected.filter(
  //     ({ socketId }) => socketId !== id
  //   ),
  // });
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/MainServer/index.html");
});

io.on("connection", (socket) => {
  addConnected({
    state: inMemoryState,
    connection: {
      resistanceCodeName: socket.handshake.auth.resistanceCodeName,
      socketId: socket.id,
    },
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
  socket.on("show connected", () => {
    // console.log(inMemoryState.connected);
  });
  socket.on("disconnect", () => {
    removeConnected();
    console.log("user disconnected");
  });
});

server.listen(3333, () => {
  console.log("listening on *:3333");
});
