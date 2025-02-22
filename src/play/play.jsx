import React from 'react';
import { Board } from './board';
import './play.css';

export function Play(props) {
  return (
    <main>
      <div>
        Player:
        <span className="text-white-50">{props.userName}</span>
      </div>

      <br/>

      <section className="text-center">
        <div>
          <h3 className="green-text">Your Board</h3>
          <svg width="320" height="320" xmlns="https://salvoattack.click/player-board">
            <Board gridColor={props.gridColor} />
            <ellipse rx="5" ry="10" cx="40" cy="40" fill={props.gridColor}/>
            <ellipse rx="5" ry="10" cx="250" cy="190" fill={props.gridColor}/>
            <ellipse rx="5" ry="10" cx="100" cy="130" fill={props.gridColor}/>
            <ellipse rx="5" ry="10" cx="190" cy="70" fill={props.gridColor}/>
            <ellipse rx="5" ry="10" cx="70" cy="280" fill={props.hitColor}/>
          </svg>
        </div>
        <div>
          <h3 className="green-text">Opponent's Board</h3>
          <svg width="320" height="320" xmlns="https://salvoattack.click/opponent-board">
            <Board gridColor={props.gridColor} />
            <ellipse rx="5" ry="10" cx="70" cy="40" fill={props.hitColor}/>
            <ellipse rx="5" ry="10" cx="100" cy="280" fill="#FFFFFF"/>
            <ellipse rx="5" ry="10" cx="280" cy="130" fill={props.hitColor}/>
            <ellipse rx="5" ry="10" cx="160" cy="100" fill="#FFFFFF"/>
            <ellipse rx="5" ry="10" cx="250" cy="250" fill="#FFFFFF"/>
          </svg>
        </div>
      </section>

      <div className="text-center legend-box  bg-secondary">
        <h4>Legend</h4>
        <div className="legend-elements">
          <div className="element">
            <svg width="10" height="20" xmlns="https://salvoattack.click/ship">
              <ellipse rx="5" ry="10" cx="5" cy="10" fill={props.gridColor}/>
            </svg>
          </div>
          <div className="element">
            <span>Ship</span>
          </div>
          <div className="element">
            <svg width="10" height="20" xmlns="https://salvoattack.click/ship">
              <ellipse rx="5" ry="10" cx="5" cy="10" fill={props.hitColor}/>
            </svg>
          </div>
          <div className="element">
            <span>Hit</span>
          </div>
          <div className="element">
            <svg width="10" height="20" xmlns="https://salvoattack.click/ship">
              <ellipse rx="5" ry="10" cx="5" cy="10" fill="#FFFFFF"/>
            </svg>
          </div>
          <div className="element">
            <span>Miss</span>
          </div>
        </div>
      </div>
    </main>
  );
}