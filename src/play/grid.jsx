import React from 'react';

export function Grid(props) {
    return (
        <>
            <rect width="300" height="300" x="0" y="0" stroke="#606060" strokeWidth="3"/>
            <line x1="0" y1="30" x2="300" y2="30" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="0" y1="60" x2="300" y2="60" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="0" y1="90" x2="300" y2="90" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="0" y1="120" x2="300" y2="120" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="0" y1="150" x2="300" y2="150" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="0" y1="180" x2="300" y2="180" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="0" y1="210" x2="300" y2="210" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="0" y1="240" x2="300" y2="240" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="0" y1="270" x2="300" y2="270" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="30" y1="0" x2="30" y2="300" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="60" y1="0" x2="60" y2="300" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="90" y1="0" x2="90" y2="300" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="120" y1="0" x2="120" y2="300" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="150" y1="0" x2="150" y2="300" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="180" y1="0" x2="180" y2="300" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="210" y1="0" x2="210" y2="300" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="240" y1="0" x2="240" y2="300" stroke={props.gridColor} strokeWidth="3"/>
            <line x1="270" y1="0" x2="270" y2="300" stroke={props.gridColor} strokeWidth="3"/>
        </>
    );
}
