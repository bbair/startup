import React from 'react';
import Button from 'react-bootstrap/Button';
import { Grid } from './grid';

export function Board(props) {
    const leftMargin = 10;
  
    const handleClick = (event) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - leftMargin;
        const y = event.clientY - rect.top;
        console.log(`Click position relative to element: x=${x}, y=${y}`);
        console.log(`Grid position: x=${Math.round(x/30)}, y=${Math.round(y/30)}`)
    };

    return (
        <>
            <Button onClick={handleClick} variant=''>
                <svg width="300" height="300">
                    <Grid gridColor={props.gridColor} />
                    {/* <ellipse rx="5" ry="10" cx="40" cy="40" fill={props.gridColor}/>
                    <ellipse rx="5" ry="10" cx="250" cy="190" fill={props.gridColor}/>
                    <ellipse rx="5" ry="10" cx="100" cy="130" fill={props.gridColor}/>
                    <ellipse rx="5" ry="10" cx="190" cy="70" fill={props.gridColor}/>
                    <ellipse rx="5" ry="10" cx="70" cy="280" fill={props.hitColor}/> */}
                </svg>
            </Button>
        </>
    );
}
