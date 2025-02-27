import React from 'react';
import { Board } from './board';
import { Legend } from './legend';
import './play.css';

export function Play(props) {
  const [allowPlayer, setAllowPlayer] = React.useState(false);
  const [playerShips, setPlayerShips] = React.useState(new Map());
  const [opponentShipPositions, setOpponentShipPositions] = React.useState(new Map());
  const [playerHits, setPlayerHits] = React.useState(new Map());
  const [opponentHits, setOpponentHits] = React.useState(new Map());
  const [playerMisses, setPlayerMisses] = React.useState(new Map());
  const [opponentMisses, setOpponentMisses] = React.useState(new Map());
  const [playerBoardMarkers, setPlayerBoardMarkers] = React.useState(new Map());
  const [opponentBoardMarkers, setOpponentBoardMarkers] = React.useState(new Map());
  const [attackCount, setAttackCount] = React.useState(0);

  function addAttack(position) {
    if (attackCount <= 5) {
      const newPlayerMisses = new Map([...playerMisses])
      newPlayerMisses.set(playerMisses.size,{x: position.x, y: position.y, color: '#FFFFFF'});
      setPlayerMisses(newPlayerMisses);
    }
  }

  function addShip(position) {
    if (playerShips.size < 5) {
      const newPlayerShips = new Map([...playerShips])
      newPlayerShips.set(playerShips.size,{x: position.x, y: position.y, color: props.gridColor});
      setPlayerShips(newPlayerShips);
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

  React.useEffect(() => {
    setPlayerBoardMarkers(combineMaps([opponentHits,playerShips,opponentMisses]));
  }, [playerShips, opponentHits, opponentMisses]);

  React.useEffect(() => {
    setOpponentBoardMarkers(combineMaps([playerHits,playerMisses]));
  }, [playerHits, playerMisses]);
  
  React.useEffect(() => {
    setAttackCount(attackCount + 1);
  }, [playerMisses]);

  return (
    <main>
      <div>
        Player:
        <span className="text-white-50">{props.userName}</span>
      </div>

      <br/>

      <section className="text-center">
        <div>
          <h4 className="green-text">Your Board</h4>
          <Board
            markers={playerBoardMarkers}
            gridColor={props.gridColor}
            onClick={(position) => {
              addShip(position);
            }}
          />
        </div>
        <div>
          <h4 className="green-text">Opponent's Board</h4>
          <Board
            markers={opponentBoardMarkers}
            gridColor={props.gridColor}
            onClick={(position) => {
              addAttack(position);
            }}
          />
        </div>
      </section>

      <Legend gridColor={props.gridColor} hitColor={props.hitColor} />
    </main>
  );
}