import React from 'react';
import Button from 'react-bootstrap/Button';
import { Grid } from './grid';
import { Marker } from './marker';

export function Board(props) {
    const leftMargin = 10;

    const [markers, setMarkers] = React.useState(new Map());
    const [markersArray, setMarkersArray] = React.useState(new Array());
    const [markerIndex, setMarkerIndex] = React.useState(0);
  
    const handleClick = (event) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = Math.round((event.clientX - rect.left - leftMargin)/30)*30;
        const y = Math.round((event.clientY - rect.top)/30)*30;
        placeMarker(x, y);
    };

    function placeMarker(x,y) {
        if (!markers.values().some(value => value.x === x && value.y === y)) {
            const newMarkerMap = new Map();
            markers.forEach((value,key) => {newMarkerMap.set(key,value)});
            newMarkerMap.set(markerIndex, { x: x, y: y, color: props.gridColor });
            setMarkers(newMarkerMap);
        }
    }
 
    React.useEffect(() => {
        setMarkersArray(Array.from(markers, ([key, value]) => {
            return <Marker key={key} x={value.x} y={value.y} color={value.color}></Marker>;
        }));
        console.log(markers)
    }, [markers]);

    React.useEffect(() => {
        setMarkerIndex(markerIndex + 1);
    }, [markers]);

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
