const GameEvent = {
    Attack: 'attack',
    Matched: 'matched',
};

class GameCommunication {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
}

class GameEventCommunicator {
    events = [];
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
      console.log(this.handlers);
    }
  
    removeHandler(handler) {
      this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
  
      this.events.forEach((e) => {
        this.handlers.forEach((handler) => {
          handler(e);
        });
      });
    }
}

const GameCommunicator = new GameEventCommunicator();
export { GameEvent, GameCommunicator };
  