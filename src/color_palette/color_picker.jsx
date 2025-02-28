import React from 'react';

export function ColorPicker(props) {
    function onChange(e) {
        props.onChangeColor(e.target.value);
    }

    return (
        <div>
            <input type="color" onChange={onChange} value={props.color} />
        </div>
    );
}