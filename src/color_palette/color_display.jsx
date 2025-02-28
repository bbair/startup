import React from 'react';

export function ColorDisplay({color}) {
    return (
        <div>
            <input type="color" disabled={true} value={color} />
        </div>
    );
}