import React from 'react';

export function Legend(props) {
    return (
        <>
            <div className="text-center legend-box bg-secondary">
                <h6>Legend</h6>
                <div className="legend-elements">
                    <div className="element">
                        <svg width="10" height="20" xmlns="https://salvoattack.click/ship">
                            <ellipse rx="5" ry="10" cx="5" cy="10" fill={props.gridColor}/>
                        </svg>
                    </div>
                    <div className="element">
                        <span>Ship</span>
                    </div>
                    <div className="element">
                        <svg width="10" height="20" xmlns="https://salvoattack.click/ship">
                            <ellipse rx="5" ry="10" cx="5" cy="10" fill={props.hitColor}/>
                        </svg>
                    </div>
                    <div className="element">
                        <span>Hit</span>
                    </div>
                    <div className="element">
                        <svg width="10" height="20" xmlns="https://salvoattack.click/ship">
                            <ellipse rx="5" ry="10" cx="5" cy="10" fill="#FFFFFF"/>
                        </svg>
                    </div>
                    <div className="element">
                        <span>Miss</span>
                    </div>
                </div>
            </div>
        </>
    );
}
