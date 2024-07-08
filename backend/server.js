const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const { Pokemon } = require("./data/pokemon");
const { generateGameCode } = require("./utils/utils");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = 5969;

// Enable CORS for all requests
app.use(cors());

const games = {};
const turn = 0;
// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("newGame", () => {
    gameID = generateGameCode();
    console.log(gameID);
    while (games.includes(gameID)) {
      gameID = generateGameCode();
      return;
    }
    games[gameID] = { players: [socket.id] };
    socket.emit("gameCreated", { gameID: gameID });
  });
  // socket// Send Pokemon data to the client
  socket.on("connectToGame", (data) => {
    socket.emit("pokemonData", { data: Pokemon, clientID: socket.id });
    console.log("Connected");
  });

  // Handle move selection from the client
  socket.on("moveSelection", ({ name, damage, type, targetType, clientID }) => {
    console.log(
      `Received move selection: ${name} (${damage} damage, ${type} type) from ${clientID}`,
    );

    // Calculate damage based on target Pokemon type
    let modifiedDamage = damage;
    if (targetType === "Fire" && type === "Water") {
      modifiedDamage *= 0.5;
    } else if (targetType === "Water" && type === "Grass") {
      modifiedDamage *= 2;
    }

    // Send damage to the target client
    socket.broadcast.emit("damage", modifiedDamage);
  });

  // Handle disconnections
  socket.on("disconnect", (socket) => {
    console.log("Client disconnected");
  });
});

// Handle HTTP requests
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
