import React from 'react';
import { Board } from './board';
import { Legend } from './legend';
import './play.css';

export function Play(props) {
  const [allowPlayer, setAllowPlayer] = React.useState(false);
  const [playerShipPositions, setPlayerShipPositions] = React.useState([]);
  const [opponentShipPositions, setOpponentShipPositions] = React.useState([]);
  const [playerHits, setPlayerHits] = React.useState([]);
  const [opponentHits, setOpponentHits] = React.useState([]);
  const [playerMisses, setPlayerMisses] = React.useState([]);
  const [opponentMisses, setOpponentMisses] = React.useState([]);

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
          <Board gridColor={props.gridColor} />
        </div>
        <div>
          <h4 className="green-text">Opponent's Board</h4>
          <Board gridColor={props.gridColor} />
        </div>
      </section>

      <Legend gridColor={props.gridColor} hitColor={props.hitColor} />
    </main>
  );
}