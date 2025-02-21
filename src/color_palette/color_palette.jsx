import React from 'react';
import { ColorPicker } from './color_picker';
import './color_palette.css'

export function ColorPalette() {
  return (
    <main className="text-center">
        <div>
            <h2 className="green-text">Current</h2>
            <div className="palette-block">
                <div className="color-block">
                    <label for="current-color-main">Main (Grid): </label>
                    <div className="color-picker">
                        <input type="color" id="current-color-main" name="current-color-main" disabled="true" value="#008000"/>
                    </div>
                </div>
                <div className="color-block">
                    <label for="current-color-hit">Secondary (Hit): </label>
                    <div className="color-picker">
                        <input type="color" id="current-color-hit" name="current-color-hit" disabled="true" value="#FF0000"/>
                    </div>
                </div>
            </div>
            <h2 className="green-text">Customize Color Palette</h2>
            <div className="palette-block">
                <div className="color-block">
                    <label for="current-color-main">Main (Grid): </label>
                    <div className="color-picker">
                        <ColorPicker />
                    </div>
                </div>
                <div className="color-block">
                    <label for="current-color-hit">Secondary (Hit): </label>
                    <div className="color-picker">
                        <ColorPicker />
                    </div>
                </div>
                <button type="submit" className="btn btn-secondary">Generate</button>
            </div>
        </div>
    </main>
  );
}