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

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("newGame", () => {
    let gameID = generateGameCode();
    console.log(`New game created with ID: ${gameID}`);
    while (Object.keys(games).includes(gameID)) {
      gameID = generateGameCode();
      console.log(`Generated new game ID: ${gameID}`);
    }
    games[gameID] = { players: [socket.id] };
    console.log(games);
    socket.emit("allowJoinGame", { gameID: gameID, clientID: socket.id });
    console.log(`Game ${gameID} initialized with player: ${socket.id}`);
  });

  socket.on("askToJoin", ({ gameID }) => {
    console.log(`Client requesting to join game: ${gameID}`);
    if (games[gameID] && games[gameID].players.length < 2) {
      games[gameID].players.push(socket.id);
      socket.emit("allowJoinGame", { gameID: gameID, clientID: socket.id });
      console.log(`Client ${socket.id} allowed to join game: ${gameID}`);
    } else {
      console.log(
        `Client denied access to game: ${gameID}, games: ${JSON.stringify(games)}`,
      );
    }
  });

  // Send Pokemon data to the client
  socket.on("connectToGame", ({ gameID, clientID }) => {
    console.log("Connecting to game:", gameID, clientID);
    if (!games[gameID] || !games[gameID].players.includes(clientID)) {
      socket.emit("endGame");
      console.log(
        "Game ended due to invalid game state or client not part of the game",
      );
    } else {
      socket.emit("pokemonData", { data: Pokemon });
      console.log(`Sent Pokemon data to client: ${socket.id}`);
      console.log("Client connected to the game:", gameID);
    }
  });

  // Handle move selection from the client
  socket.on(
    "moveSelection",
    ({ name, damage, type, targetType, clientID, gameID }) => {
      console.log(
        `Received move selection: ${name} (${damage} damage, ${type} type) from ${clientID} in game ${gameID} against ${games[gameID].players.filter((x) => x !== clientID)[0]}`,
      );

      // Calculate damage based on target Pokemon type
      let modifiedDamage = damage;
      if (targetType === "Fire" && type === "Water") {
        modifiedDamage *= 0.5;
        console.log(
          `Damage modified to ${modifiedDamage} due to type advantage`,
        );
      } else if (targetType === "Water" && type === "Grass") {
        modifiedDamage *= 2;
        console.log(
          `Damage modified to ${modifiedDamage} due to type advantage`,
        );
      }

      // Send damage to the target client
      socket.broadcast.emit("damage", modifiedDamage);
      console.log(`Broadcasted damage: ${modifiedDamage}`);
    },
  );

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Handle HTTP requests
app.get("/", (req, res) => {
  res.send("Hello, world!");
  console.log("HTTP request to '/' endpoint");
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
