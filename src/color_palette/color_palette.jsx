import React from 'react';
import './color_palette.css'

export function ColorPalette() {
  return (
    <main className="text-center">
        <div>
            <h2 className="green-text">Current</h2>
            <div className="palette-block">
                <div className="color-block">
                    <label for="current-color-main">Main (Grid): </label>
                    <input type="color" id="current-color-main" name="current-color-main" disabled="true" value="#008000"/>
                </div>
                <div className="color-block">
                    <label for="current-color-hit">Secondary (Hit): </label>
                    <input type="color" id="current-color-hit" name="current-color-hit" disabled="true" value="#FF0000"/>
                </div>
            </div>
            <h2 className="green-text">Customize Color Palette</h2>
            <div className="palette-block">
                <div className="color-block">
                    <label for="current-color-main">Main (Grid): </label>
                    <input type="color" id="custom-color-main" name="custom-color-main" value="#A020F0"/>
                </div>
                <div className="color-block">
                    <label for="current-color-hit">Secondary (Hit): </label>
                    <input type="color" id="custom-color-hit" name="custom-color-hit" value="#FFFF00"/>
                </div>
                <button type="submit" className="btn btn-secondary">Generate</button>
            </div>
        </div>
    </main>
  );
}