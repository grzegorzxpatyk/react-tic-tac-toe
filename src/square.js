import React from 'react';

export default function Square(props) {
    return (
        <button
            className={
                'square ' + (props.isWinningSquare ? 'square-winning' : null)
            }
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
