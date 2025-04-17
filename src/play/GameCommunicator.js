const GameEvent = {
  Attack: 'attack',
  Disconnected: 'opponentDisconnected',
  Hits: 'sendingHits',
  Matched: 'matched',
  SendingAttacks: 'sendingAttacks',
};

class GameCommunication {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventCommunicator {
  handlers = [];

  connectSocket(username) {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws?username=${username}`);
    this.socket.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        this.receiveEvent(event);
      } catch {}
    };
  }

  closeSocket() {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
  }

  broadcastCommunication(from, type, value) {
    const event = new GameCommunication(from, type, value);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const GameCommunicator = new GameEventCommunicator();
export { GameEvent, GameCommunicator };
  