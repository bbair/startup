import React from 'react';
import Button from 'react-bootstrap/Button';
import { ColorPicker } from './color_picker';
import { ColorDisplay } from './color_display';
import './color_palette.css'

export function ColorPalette() {
    const [customGridColor, setCustomGridColor] = React.useState('#008000');
    const [customHitColor, setCustomHitColor] = React.useState('#FF0000');
    const [gridColor, setGridColor] = React.useState('#008000');
    const [hitColor, setHitColor] = React.useState('#FF0000');

    function update_palette() {
        setGridColor(customGridColor);
        setHitColor(customHitColor);
    }

    function generate_palette() {
        // call API here to generate new palette
        setCustomGridColor('#FFFFFF');
        setCustomHitColor('#FFFFFF');
    }

    return (
        <main className="text-center">
            <div>
                <h2 className="green-text">Current</h2>
                <div className="palette-block">
                    <div className="color-block">
                        <label>Main (Grid): </label>
                        <div className="color-picker">
                            <ColorDisplay color={gridColor} />
                        </div>
                    </div>
                    <div className="color-block">
                        <label>Secondary (Hit): </label>
                        <div className="color-picker">
                            <ColorDisplay color={hitColor} />
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