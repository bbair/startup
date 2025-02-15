import React from 'react';
import './about_rules.css'

export function AboutRules() {
  return (
    <main className="text-box">
        <h2 className="green-text">About</h2>
        <p>
            Salvo Attack is a spinoff of the well-known game of Battleship. 
            In this online naval battle game, you will be able to attack with each of your ships, 
            trying to sink your opponent's ships before they sink yours!
        </p>
        <h2 className="green-text">Rules</h2>
        <ol>
            <li>
            <b>Setup Round -</b> Both players will place each of their five ships on their board. 
            Ships can be placed at intersections on the grid and cannot be placed on top of another ship. 
            Ships may not be moved at any point during the game.
            </li>
            <li>
            <b>Attack Round -</b> When both players are done placing their ships, each player will try 
            to attack their opponent's ships. This is done by clicking on the opponent's board 
            at intersections of the grid where their ships might be. Each of your surviving ships 
            will have one attack.
            </li>
            <li>
            <b>Information Gathering Round -</b> After both players have attacked their opponent, 
            hits on their ships and their opponent's ships, as well as misses, will be shown 
            on both their board and their opponent's board. 
            </li>
        </ol>
        <p>
            The Attack and Information Gathering Rounds will repeat until one player has sunk 
            all of their opponent's ships, winning the game. A tie can occur if both players 
            have sunk their opponent's ships at the end of an Information Gathering Round.
        </p>
    </main>
  );
}