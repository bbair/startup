const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  // Player queue for matchmaking
  let playerQueue = [];
  
  // Store game rooms: Each game room has two players
  let gameRooms = [];

  socketServer.on('connection', (socket) => {
    console.log('A player connected.');
    socket.isAlive = true;

    // Assign player a unique ID
    const playerId = Date.now(); // Using timestamp for unique player ID
  
    // Add the player to the queue for matchmaking
    playerQueue.push({ playerId, socket });

    // Check if there are two players available for a game
    if (playerQueue.length >= 2) {
      // Pair the first two players together and create a game room
      const player1 = playerQueue.shift();
      const player2 = playerQueue.shift();
  
      // Create a new game room with the two players
      const gameRoom = {
        roomId: Date.now(),  // Unique game room ID
        players: [player1, player2],
      };
  
      gameRooms.push(gameRoom);

      console.log(`Game started between Player ${player1.playerId} and Player ${player2.playerId}`);
    }

    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      if (data.type === 'attack') {
        // Find the game room that the player is part of
        const gameRoom = gameRooms.find(room =>
          room.players.some(player => player.playerId === data.playerId)
        );
  
        if (gameRoom) {  
          console.log(`Attack received from Player ${data.playerId}`);
        }
      }
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });

    // Handle client disconnection
    socket.on('close', () => {
      console.log('A player disconnected.');

      // Remove the player from the queue if they haven't been paired yet
      playerQueue = playerQueue.filter(player => player.socket !== socket);

      // Find the game room and remove the player if they were part of a game
      gameRooms.forEach(gameRoom => {
        gameRoom.players = gameRoom.players.filter(player => player.socket !== socket);
        if (gameRoom.players.length === 0) {
          // If both players left, remove the game room
          gameRooms = gameRooms.filter(room => room.roomId !== gameRoom.roomId);
        }
      });
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };