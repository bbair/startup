import React from 'react';

export function Marker({x,y,color}) {
    return (
        <>
            <ellipse rx="5" ry="10" cx={x} cy={y} fill={color}/>
        </>
    );
}
