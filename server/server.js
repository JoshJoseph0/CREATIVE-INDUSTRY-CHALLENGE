const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

let answers = [];
let currentQuestion = "What does the future of museums look like?";

io.on("connection", (socket) => {

  console.log("User connected");

  socket.emit("init", {
    answers,
    question: currentQuestion
  });

  socket.on("submitAnswer", (text) => {

    const entry = {
      text,
      time: Date.now()
    };

    answers.push(entry);

    io.emit("newAnswer", entry);

  });

});

server.listen(3005, "0.0.0.0", () => {
  console.log("Server running on port 3005");
});