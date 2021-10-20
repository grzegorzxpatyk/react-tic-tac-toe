import React from 'react';
import Square from './square';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={'square #' + i}
                isWinningSquare={this.props.winningSquares.includes(i)}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

        
    renderRow(i) { // i - index of the square to be rendered currently
        let squares = []; // start out with an empty array that in the end will be returned
        for (let j = i; j < i + 3; j++) { // 3 squares in 1 row
            squares.push(this.renderSquare(j));
        }
        return squares;
    }

    renderRows(n) { // n - number of rows you would like to render
        let rows = [];
        for (let k = 0; k < 3 * n; k+=3) { // 3 rows, 3 squares each
            rows.push(<div className="board-row" key={'row #' + k}>{this.renderRow(k)}</div>);
        }
        return rows;
    }

    render() {
        return (
            <div>
                {this.renderRows(3)}
            </div>
        );
    }
}

export default Board;