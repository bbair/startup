import React from 'react';
import './play.css'

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
            <rect width="300" height="300" x="10" y="10" stroke="#606060" strokeWidth="3"/>
            <line x1="10" y1="40" x2="310" y2="40" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="70" x2="310" y2="70" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="100" x2="310" y2="100" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="130" x2="310" y2="130" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="160" x2="310" y2="160" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="190" x2="310" y2="190" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="220" x2="310" y2="220" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="250" x2="310" y2="250" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="280" x2="310" y2="280" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="40" y1="10" x2="40" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="70" y1="10" x2="70" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="100" y1="10" x2="100" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="130" y1="10" x2="130" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="160" y1="10" x2="160" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="190" y1="10" x2="190" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="220" y1="10" x2="220" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="250" y1="10" x2="250" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="280" y1="10" x2="280" y2="310" stroke={props.gridColor} strokeWidth="3"/>
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
            <rect width="300" height="300" x="10" y="10" stroke="#606060" strokeWidth="3"/>
            <line x1="10" y1="40" x2="310" y2="40" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="70" x2="310" y2="70" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="100" x2="310" y2="100" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="130" x2="310" y2="130" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="160" x2="310" y2="160" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="190" x2="310" y2="190" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="220" x2="310" y2="220" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="250" x2="310" y2="250" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="10" y1="280" x2="310" y2="280" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="40" y1="10" x2="40" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="70" y1="10" x2="70" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="100" y1="10" x2="100" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="130" y1="10" x2="130" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="160" y1="10" x2="160" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="190" y1="10" x2="190" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="220" y1="10" x2="220" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="250" y1="10" x2="250" y2="310" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="280" y1="10" x2="280" y2="310" stroke={props.gridColor} strokeWidth="3"/>
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