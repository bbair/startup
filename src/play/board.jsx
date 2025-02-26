import React from 'react';
import Button from 'react-bootstrap/Button';
import { Grid } from './grid';

export function Board(props) {
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
