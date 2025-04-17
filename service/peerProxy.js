const { WebSocketServer } = require('ws');
const url = require('url');

function peerProxy(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  // Player queue for matchmaking
  let playerQueue = [];
  
  // Store game rooms: Each game room has two players
  let gameRooms = [];

  socketServer.on('connection', (socket, req) => {
    const query = url.parse(req.url, true).query;
    const username = query.username;
  
    if (!username) {
      console.log('Connection rejected: no username');
      socket.close();
      return;
    }

    // console.log(`${username} connected.`);
    socket.isAlive = true;

    // Add the player to the queue for matchmaking
    playerQueue.push({ playerID: username, socket });

    // Check if there are two players available for a game
    if (playerQueue.length >= 2) {
      // Pair the first two players together and create a game room
      const player1 = playerQueue.shift();
      const player2 = playerQueue.shift();
  
      // Create a new game room with the two players
      const gameRoom = {
        roomId: Date.now(),  // Unique game room ID
        players: [player1, player2],
        attacks: {
          [player1.playerID]: null,
          [player2.playerID]: null,
        },
      };
  
      gameRooms.push(gameRoom);

      // console.log(`Game started between Player ${player1.playerID} and Player ${player2.playerID}`);
      player1.socket.send(JSON.stringify({
        from: 'salvoAttack',
        type: 'matched',
        value: { opponent: player2.playerID },
      }));
      player2.socket.send(JSON.stringify({
        from: 'salvoAttack',
        type: 'matched',
        value: { opponent: player1.playerID },
      }));
    }

    // Forward messages to everyone except the sender
    socket.on('message', (message) => {
      const data = JSON.parse(message);
      // Find the game room that the player is part of
      const gameRoom = gameRooms.find(room =>
        room.players.some(player => player.playerID === data.from)
      );
      
      if (!gameRoom) return;

      const opponent = gameRoom.players.find(p => p.playerID !== data.from);
      if (data.type === 'attack') {
        gameRoom.attacks[data.from] = data.value.attacks;

        // when both submitted, send to both
        const allSubmitted = Object.values(gameRoom.attacks).every(a => a !== null);
        if (allSubmitted) {
          gameRoom.players.forEach(p => {
            const oppID = p.playerID === data.from ? opponent.playerID : data.from;
            const opponentAttacks = gameRoom.attacks[oppID];
  
            p.socket.send(JSON.stringify({
              from: 'salvoAttack',
              type: 'sendingAttacks',
              value: { attacks: opponentAttacks }
            }));
          });
          gameRoom.attacks = {
            [gameRoom.players[0].playerID]: null,
            [gameRoom.players[1].playerID]: null,
          }
        }
      }
      else {
        opponent.socket.send(JSON.stringify(data));
      }
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });

    // Handle client disconnection
    socket.on('close', () => {
      // console.log('A player disconnected.');

      // Remove the player from the queue if they haven't been paired yet
      playerQueue = playerQueue.filter(player => player.socket !== socket);

      // Find the game room and remove the player if they were part of a game
      gameRooms.forEach(gameRoom => {
        gameRoom.players = gameRoom.players.filter(player => player.socket !== socket);
        if (gameRoom.players.length === 1) {
          // Send a message if opponent disconnects
          gameRoom.players[0].socket.send(JSON.stringify({
            from: 'salvoAttack',
            type: 'opponentDisconnected',
            value: {},
          }));
          // Add opponent back to queue
          playerQueue.push({ playerID: gameRoom.players[0].playerID, socket: gameRoom.players[0].socket });
          // Remove game room
          gameRooms = gameRooms.filter(room => room.roomId !== gameRoom.roomId);
        }
      });
    });

    socket.on("error", (err) => {
      console.log(err.stack);
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