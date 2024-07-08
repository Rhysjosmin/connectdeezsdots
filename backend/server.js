const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { Pokemon } = require('./data/pokemon');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const port = 5969;

// Enable CORS for all requests
app.use(cors());

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send Pokemon data to the client
  socket.emit('pokemonData', Pokemon);

  // Handle move selection from the client
  socket.on('moveSelection', ({ moveName, damage, type, targetType }) => {
    console.log(`Received move selection: ${moveName} (${damage} damage, ${type} type)`);

    // Calculate damage based on target Pokemon type
    let modifiedDamage = damage;
    if (targetType === 'Fire' && type === 'Water') {
      modifiedDamage *= 0.5;
    } else if (targetType === 'Water' && type === 'Grass') {
      modifiedDamage *= 2;
    }

    // Send damage to the target client
    socket.broadcast.emit('damage', modifiedDamage);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Handle HTTP requests
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});