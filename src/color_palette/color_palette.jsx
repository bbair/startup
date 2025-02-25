import React from 'react';
import Button from 'react-bootstrap/Button';
import { ColorPicker } from './color_picker';
import { ColorDisplay } from './color_display';
import './color_palette.css'

export function ColorPalette(props) {
    const [customGridColor, setCustomGridColor] = React.useState('#008000');
    const [customHitColor, setCustomHitColor] = React.useState('#FF0000');

    function update_palette() {
        localStorage.setItem('gridColor', customGridColor);
        localStorage.setItem('hitColor', customHitColor);
        props.onChangeGridColor(customGridColor);
        props.onChangeHitColor(customHitColor);
    }

    function generate_palette() {
        // call API here to generate new palette
        setCustomGridColor('#800080');
        setCustomHitColor('#FFFF00');
    }

    return (
        <main className="text-center">
            <div>
                <h2 className="green-text">Current</h2>
                <div className="palette-block">
                    <div className="color-block">
                        <label>Main (Grid): </label>
                        <div className="color-picker">
                            <ColorDisplay color={props.gridColor} />
                        </div>
                    </div>
                    <div className="color-block">
                        <label>Secondary (Hit): </label>
                        <div className="color-picker">
                            <ColorDisplay color={props.hitColor} />
                        </div>
                    </div>
                </div>
                <h2 className="green-text">Customize Color Palette</h2>
                <div className="palette-block">
                    <div className="color-block">
                        <label>Main (Grid): </label>
                        <div className="color-picker">
                            <ColorPicker
                                color={customGridColor}
                                onChangeColor={(newColor) => {
                                    setCustomGridColor(newColor);
                                }}
                            />
                        </div>
                    </div>
                    <div className="color-block">
                        <label>Secondary (Hit): </label>
                        <div className="color-picker">
                            <ColorPicker
                                color={customHitColor}
                                onChangeColor={(newColor) => {
                                    setCustomHitColor(newColor);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Button className="spaced-button" variant='light' onClick={() => update_palette()}>
                    Update With Custom
                </Button>
                <Button className="spaced-button" variant='light' onClick={() => generate_palette()}>
                    Generate New
                </Button>
            </div>
        </main>
    );
}