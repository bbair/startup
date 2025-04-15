const WebSocket = require('ws');

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Player queue for matchmaking
let playerQueue = [];

// Store game rooms: Each game room has two players
let gameRooms = [];

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('A player connected.');

  // Assign player a unique ID
  const playerId = Date.now(); // Using timestamp for unique player ID
  
  // Add the player to the queue for matchmaking
  playerQueue.push({ playerId, ws });

  // Check if there are two players available for a game
  if (playerQueue.length >= 2) {
    // Pair the first two players together and create a game room
    const player1 = playerQueue.shift();
    const player2 = playerQueue.shift();

    // Create a new game room with the two players
    const gameRoom = {
      roomId: Date.now(),  // Unique game room ID
      players: [player1, player2],
      turn: 1,  // Player 1 starts
    };

    gameRooms.push(gameRoom);

    // Notify the players about the game state (initial positions)
    const initialGameState = {
      players: [
        { id: player1.playerId, position: { x: 0, y: 0 } },
        { id: player2.playerId, position: { x: 0, y: 0 } },
      ],
      turn: 1,  // Player 1 starts
    };

    // Send game state to both players
    player1.ws.send(JSON.stringify({ type: 'gameState', gameState: initialGameState }));
    player2.ws.send(JSON.stringify({ type: 'gameState', gameState: initialGameState }));

    console.log(`Game started between Player ${player1.playerId} and Player ${player2.playerId}`);
  }

  // Handle incoming messages (e.g., moves)
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'move') {
      // Find the game room that the player is part of
      const gameRoom = gameRooms.find(room =>
        room.players.some(player => player.playerId === data.playerId)
      );

      if (gameRoom) {
        // Find the player and update their position
        const player = gameRoom.players.find(p => p.playerId === data.playerId);
        if (player) {
          player.position = data.position;
        }

        // Switch the turn to the other player
        gameRoom.turn = gameRoom.turn === 1 ? 2 : 1;

        // Broadcast the updated game state to both players in this room
        const updatedGameState = {
          players: gameRoom.players.map(player => ({
            id: player.playerId,
            position: player.position,
          })),
          turn: gameRoom.turn,
        };

        gameRoom.players.forEach(player => {
          player.ws.send(JSON.stringify({ type: 'gameState', gameState: updatedGameState }));
        });

        console.log(`Move received from Player ${data.playerId}. Updated game state broadcasted.`);
      }
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('A player disconnected.');

    // Remove the player from the queue if they haven't been paired yet
    playerQueue = playerQueue.filter(player => player.ws !== ws);

    // Find the game room and remove the player if they were part of a game
    gameRooms.forEach(gameRoom => {
      gameRoom.players = gameRoom.players.filter(player => player.ws !== ws);
      if (gameRoom.players.length === 0) {
        // If both players left, remove the game room
        gameRooms = gameRooms.filter(room => room.roomId !== gameRoom.roomId);
      }
    });
  });
});

console.log('WebSocket server is running on ws://localhost:8080');