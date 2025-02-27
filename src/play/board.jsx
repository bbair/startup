import React from 'react';
import Button from 'react-bootstrap/Button';
import { Grid } from './grid';
import { Marker } from './marker';

export function Board(props) {
    const leftMargin = 10;

    const [markersArray, setMarkersArray] = React.useState(new Array());
  
    const handleClick = (event) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = Math.round((event.clientX - rect.left - leftMargin)/30)*30;
        const y = Math.round((event.clientY - rect.top)/30)*30;
        if (!props.markers.values().some(value => value.x === x && value.y === y) && x !== 0 && y !== 0) {
            props.onClick({x: x, y: y});
        }
    };
 
    React.useEffect(() => {
        setMarkersArray(Array.from(props.markers, ([key, value]) => {
            return <Marker key={key} x={value.x} y={value.y} color={value.color}></Marker>;
        }));
    }, [props.markers]);

    return (
        <>
            <Button onClick={handleClick} variant=''>
                <svg width="300" height="300">
                    <Grid gridColor={props.gridColor} />
                    <>{markersArray}</>
                </svg>
            </Button>
        </>
    );
}
