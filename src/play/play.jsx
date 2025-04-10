import React from 'react';
import { Board } from './board';
import { Legend } from './legend';
import { GameEvent, GameCommunicator } from './GameCommunicator';
import './play.css';

export function Play(props) {
  const [allowPlayer, setAllowPlayer] = React.useState(true);
  const [attackCount, setAttackCount] = React.useState(0);
  const [message, setMessage] = React.useState('Place your ships');
  const [opponentBoardMarkers, setOpponentBoardMarkers] = React.useState(new Map());
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
          setMessage('Waiting for opponent...')
          setTimeout(() => {
            // This will be replaced with a WebSocket message from the opponent's game
            const opponentAttacks = new Map([
              [0, { x: getRandomPosition(), y: getRandomPosition(), color: '#FFFFFF' }],
              [1, { x: getRandomPosition(), y: getRandomPosition(), color: '#FFFFFF' }],
              [2, { x: getRandomPosition(), y: getRandomPosition(), color: '#FFFFFF' }],
              [3, { x: getRandomPosition(), y: getRandomPosition(), color: '#FFFFFF' }],
              [4, { x: getRandomPosition(), y: getRandomPosition(), color: '#FFFFFF' }]
            ]);
            opponentAttacks.forEach(attack => {
              setOpponentHits(previousHits => {
                const newOpponentHits = new Map(previousHits);
                if ([...playerShips.values()].some(value => value.x === attack.x && value.y === attack.y)) {
                  newOpponentHits.set(previousHits.size, {
                    x: attack.x,
                    y: attack.y,
                    color: props.hitColor? props.hitColor : '#FF0000'
                  });
                }
                return newOpponentHits;
              });
              setOpponentMisses(previousMisses => {
                const newOpponentMisses = new Map(previousMisses);
                if (![...playerShips.values()].some(value => value.x === attack.x && value.y === attack.y)) {
                  newOpponentMisses.set(previousMisses.size, { x: attack.x, y: attack.y, color: '#FFFFFF' });
                }
                return newOpponentMisses;
              });
            });
            newPlayerAttacks.forEach(attack => {
              setPlayerHits(previousHits => {
                const newPlayerHits = new Map(previousHits);
                if ([...opponentShips.values()].some(value => value.x === attack.x && value.y === attack.y)) {
                  newPlayerHits.set(previousHits.size, {
                    x: attack.x,
                    y: attack.y,
                    color: props.hitColor? props.hitColor : '#FF0000'
                  });
                }
                return newPlayerHits;
              });
              setPlayerMisses(previousMisses => {
                const newPlayerMisses = new Map(previousMisses);
                if (![...opponentShips.values()].some(value => value.x === attack.x && value.y === attack.y)) {
                  newPlayerMisses.set(previousMisses.size, { x: attack.x, y: attack.y, color: '#FFFFFF' });
                }
                return newPlayerMisses;
              });
            });
            setAttackCount(1);
            setMessage('Choose where to attack');
          }, 1000);
        }
        return newPlayerAttacks;
      });
    }
  }  

  function addShip(position) {
    if (playerShips.size < 5) {
      const newPlayerShips = new Map([...playerShips])
      newPlayerShips.set(playerShips.size,{
        x: position.x,
        y: position.y,
        color: props.gridColor? props.gridColor : '#008000'
      });
      setPlayerShips(newPlayerShips);
      if (newPlayerShips.size === 5) {
        setMessage('Choose where to attack');
      }
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

  function getRandomPosition() {
    return Math.floor(Math.random() * (9 - 1 + 1) + 1)*30;
  }

  React.useEffect(() => {
    GameCommunicator.broadcastCommunication(props.userName, GameEvent.Searching, {});
    setTimeout(() => {
      // This will be replaced with WebSocket message from the opponent's game
      setOpponentShips(new Map([
        [0, {x: 30, y: 30, color: props.gridColor? props.gridColor : '#008000'}],
        [1, {x: 150, y: 90, color: props.gridColor? props.gridColor : '#008000'}],
        [2, {x: 270, y: 150, color: props.gridColor? props.gridColor : '#008000'}],
        [3, {x: 180, y: 240, color: props.gridColor? props.gridColor : '#008000'}],
        [4, {x: 240, y: 270, color: props.gridColor? props.gridColor : '#008000'}]
      ]));
    }, 3000);
  }, [])

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
      <div className="text-white-50">
        Player:
        <span>{props.userName}</span>
      </div>

      <h4>{message}</h4>

      <section className="text-center">
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
      </section>

      <Legend
        gridColor={props.gridColor? props.gridColor : '#008000'}
        hitColor={props.hitColor? props.hitColor : '#FF0000'}
      />
    </main>
  );
}