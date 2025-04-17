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

  function addAttack(position) {
    if (attackCount <= 5 && playerShips.size === 5 && allowPlayer) {
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
          GameCommunicator.broadcastCommunication(props.userName, GameEvent.Ships, { ships: Array.from(newPlayerShips.values()) });
          setMessage('Choose where to attack');
        }
        return newPlayerShips;
      });
    }
  }

  function combineMaps(maps) {
    const combinedMap = new Map();
    let mapIndex = 0;
    maps.forEach(map => {
      map.forEach(value => {
        if (!combinedMap.values().some(v => value.x === v.x && value.y === v.y)) {
          combinedMap.set(mapIndex,value);
          mapIndex += 1;
        }
      });
    });
    return combinedMap;
  }

  function findHits(opponentAttacks, ships) {
    const hits = new Map();
    const misses = new Map();
    let hitKey = 0;
    let missKey = 0;
    opponentAttacks.forEach(attack => {
      const ship = ships.find(s => attack.x === s.x && attack.y === s.y);
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
    console.log(hits);
    setOpponentHits(hits);
    console.log(misses);
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
  }

  function handleCommunication(message) {
    if (message.type === GameEvent.Matched) {
      if (opponent) {
        return;
      }
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
      setPlayerShips(message.value.ships);
      findHits(message.value.attacks, message.value.ships);
    }
    else if (message.type === GameEvent.Hits) {
      console.log(playerShips);
      console.log('hits: ', message.value.hits);
    }
    else {
      console.log(message.type)
    }
  }

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
    setPlayerBoardMarkers(combineMaps([opponentHits,playerShips,opponentMisses]));
  }, [playerShips, opponentHits, opponentMisses]);

  React.useEffect(() => {
    setOpponentBoardMarkers(combineMaps([playerHits,playerMisses,playerAttacks]));
  }, [playerHits, playerMisses, playerAttacks]);
  
  React.useEffect(() => {
    setAttackCount(attackCount + 1);
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