import React from 'react';
import Button from 'react-bootstrap/Button';
import { ColorPicker } from './color_picker';
import { ColorDisplay } from './color_display';
import './color_palette.css'

export function ColorPalette(props) {
    const [customGridColor, setCustomGridColor] = React.useState('#008000');
    const [customHitColor, setCustomHitColor] = React.useState('#FF0000');

    function update_palette() {
        props.onChangeGridColor(customGridColor);
        props.onChangeHitColor(customHitColor);
    }

    async function generate_palette() {
        setCustomGridColor(await get_random_color(generate_random_seed()));
        setCustomHitColor(await get_random_color(generate_random_seed()));
    }

    function generate_random_seed() {
        return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    async function get_random_color(seed) {
        const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${seed}&mode=analogic&count=1`);
        const data = await response.json();
        return data.colors[0].hex.value
    }

    return (
        <main className="text-center">
            <div>
                <h2 className="green-text">Current</h2>
                <div className="palette-block">
                    <div className="color-block">
                        <label>Main (Grid): </label>
                        <div className="color-picker">
                            <ColorDisplay color={props.gridColor? props.gridColor : '#008000'} />
                        </div>
                    </div>
                    <div className="color-block">
                        <label>Secondary (Hit): </label>
                        <div className="color-picker">
                            <ColorDisplay color={props.hitColor? props.hitColor : '#FF0000'} />
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