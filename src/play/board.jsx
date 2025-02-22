import React from 'react';

export function Board(props) {
    return (
        <>
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
        </>
    );
}
