import React from 'react';
export function ColorPicker() {
    const [color, updateColor] = React.useState('#FFFFFF');

    function onChange(e) {
        updateColor(e.target.value);
    }

    return (
        <div>
            <input type="color" onChange={onChange} value={color} />
        </div>
    );
}