const GameEvent = {
    Searching: 'searchingForOpponent',
};

class GameCommunication {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class GameEventCommunicator {
    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    }

    broadcastCommunication(from, type, value) {
        const event = new GameCommunication(from, type, value);
        this.socket.send(JSON.stringify(event));
    }
}

const GameCommunicator = new GameEventCommunicator();
export { GameEvent, GameCommunicator };
  