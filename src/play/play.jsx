import React from 'react';
import { Board } from './board';
import { Legend } from './legend';
import { GameEvent, GameCommunicator } from './GameCommunicator';
import './play.css';

export function Play(props) {
  const [allowPlayer, setAllowPlayer] = React.useState(false);
  const [attackCount, setAttackCount] = React.useState(0);
  const [message, setMessage] = React.useState('Finding an opponent...');
  const [opponentBoardMarkers, setOpponentBoardMarkers] = React.useState(new Map());
  const [opponent, setOpponent] = React.useState(null);
  const [opponentHits, setOpponentHits] = React.useState(new Map());
  const [opponentMisses, setOpponentMisses] = React.useState(new Map());
  const [opponentShips, setOpponentShips] = React.useState(new Map());
  const [playerAttacks, setPlayerAttacks] = React.useState(new Map());
  const [playerBoardMarkers, setPlayerBoardMarkers] = React.useState(new Map());
  const [playerHits, setPlayerHits] = React.useState(new Map());
  const [playerMisses, setPlayerMisses] = React.useState(new Map());
  const [playerShips, setPlayerShips] = React.useState(new Map());
  const opponentRef = React.useRef(opponent);
  const playerShipsRef = React.useRef(playerShips);

  function addAttack(position) {
    if (attackCount <= 5 && playerShipsRef.current.size === 5 && allowPlayer) {
      setPlayerAttacks(previousAttacks => {
        const newPlayerAttacks = new Map(previousAttacks);
        newPlayerAttacks.set(newPlayerAttacks.size, { x: position.x, y: position.y, color: '#FFFFFF' });
        if (attackCount === 5) {
          GameCommunicator.broadcastCommunication(props.userName, GameEvent.Attack, { attacks: Array.from(newPlayerAttacks.values()) });
          setMessage('Waiting for opponent...');
        }
        return newPlayerAttacks;
      });
    }
  }

  function addShip(position) {
    if (playerShips.size < 5) {
      setPlayerShips(previousShips => {
        const newPlayerShips = new Map(previousShips);
        newPlayerShips.set(newPlayerShips.size, {
          x: position.x,
          y: position.y,
          color: props.gridColor? props.gridColor : '#008000'
        });
        if (newPlayerShips.size === 5) {
          setMessage('Choose where to attack');
        }
        return newPlayerShips;
      });
    }
  }

  function combineMaps(maps) {
    const combinedMap = new Map();
    const seenPositions = new Set();
  
    for (const map of maps) {
      for (const value of map.values()) {
        const key = `${value.x},${value.y}`;
        if (!seenPositions.has(key)) {
          seenPositions.add(key);
          combinedMap.set(combinedMap.size, value);
        }
      }
    }
  
    return combinedMap;
  }  

  function findHits(opponentAttacks) {
    const hits = new Map();
    const misses = new Map();
    let hitKey = 0;
    let missKey = 0;
    opponentAttacks.forEach(attack => {
      const ship = Array.from(playerShipsRef.current.values()).find(s => attack.x === s.x && attack.y === s.y);
      if (ship) {
        hits.set(hitKey, {
          x: attack.x,
          y: attack.y,
          color: props.hitColor ? props.hitColor : '#FF0000',
        });
        hitKey = hitKey + 1;
      }
      else {
        misses.set(missKey, attack);
        missKey = missKey + 1;
      }
    });
    setOpponentHits(hits);
    setOpponentMisses(misses);
    GameCommunicator.broadcastCommunication(props.userName, GameEvent.Hits, { hits: Array.from(hits.values()) });
  }

  function resetGame() {
    setAttackCount(0);
    setOpponentBoardMarkers(new Map());
    setOpponentHits(new Map());
    setOpponentMisses(new Map());
    setOpponentShips(new Map());
    setPlayerAttacks(new Map());
    setPlayerBoardMarkers(new Map());
    setPlayerHits(new Map());
    setPlayerMisses(new Map());
    setPlayerShips(new Map());
    playerShipsRef.current = new Map();
  }

  function handleCommunication(message) {
    if (message.type === GameEvent.Matched) {
      if (opponentRef.current) return;
      setMessage('Found an opponent! Place your ships');
      setOpponent(message.value.opponent);
      setAllowPlayer(true);
    }
    else if (message.type === GameEvent.Disconnected) {
      setMessage('Finding an opponent...');
      // Reset to defaults
      resetGame();
      setOpponent(null);
      setAllowPlayer(false);
    }
    else if (message.type === GameEvent.SendingAttacks) {
      findHits(message.value.attacks);
    }
    else if (message.type === GameEvent.Hits) {
      console.log(playerShipsRef.current);
      console.log('hits: ', message.value.hits);
    }
    else {
      console.log(message.type)
    }
  }

  React.useEffect(() => {
    opponentRef.current = opponent;
  }, [opponent]);

  React.useEffect(() => {
    playerShipsRef.current = playerShips;
  }, [playerShips]);

  React.useEffect(() => {
    GameCommunicator.connectSocket(props.userName);
    GameCommunicator.addHandler(handleCommunication);
    // Close WebSocket when player leaves play page
    return () => {
      GameCommunicator.closeSocket();
      GameCommunicator.removeHandler(handleCommunication);
    };
  }, []);

  React.useEffect(() => {
    setPlayerBoardMarkers(combineMaps([opponentHits,playerShipsRef.current,opponentMisses]));
  }, [playerShips, opponentHits, opponentMisses]);

  React.useEffect(() => {
    setOpponentBoardMarkers(combineMaps([playerHits,playerMisses,playerAttacks]));
  }, [playerHits, playerMisses, playerAttacks]);

  React.useEffect(() => {
    setAttackCount(prev => prev + 1);
  }, [playerAttacks]);
 

  React.useEffect(() => {
    if (playerHits.size === 5) {
      setAllowPlayer(false);
      setMessage('You won!!!');
    }
    if (opponentHits.size === 5) {
      setAllowPlayer(false);
      setMessage('You lost.');
    }
  }, [playerHits,opponentHits]);

  return (
    <main>
      <section>
        <div className="text-white-50">
          Player:
          <span>{props.userName}</span>
        </div>
        {
          opponent && (
            <div className="text-white-50 opponent-display">
              Opponent:
              <span>{opponent}</span>
            </div>
          )
        }
      </section>

      <h4>{message}</h4>

      <section className="text-center">
        {
          allowPlayer && (
            <div>
              <h4 className="green-text">Your Board</h4>
              <Board
                markers={playerBoardMarkers}
                gridColor={props.gridColor? props.gridColor : '#008000'}
                onClick={(position) => {
                  addShip(position);
                }}
              />
            </div>
          )
        }
        {
          allowPlayer && (
            <div>
              <h4 className="green-text">Opponent's Board</h4>
              <Board
                markers={opponentBoardMarkers}
                gridColor={props.gridColor? props.gridColor : '#008000'}
                onClick={(position) => {
                  addAttack(position);
                }}
              />
            </div>
          )
        }
      </section>

      <Legend
        gridColor={props.gridColor? props.gridColor : '#008000'}
        hitColor={props.hitColor? props.hitColor : '#FF0000'}
      />
    </main>
  );
}