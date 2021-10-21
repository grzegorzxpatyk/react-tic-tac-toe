import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';
import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    location: i,
                },
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0, // all moves with even index are 'X' moves
        });
    }

    calculateWinningSquares(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return [a, b, c];
            }
        }
        return null;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const winningSquares = this.calculateWinningSquares(current.squares);

        const moves = history.map((step, move) => {
            let col = () => {
                if ([0, 3, 6].includes(step.location)) {
                    return 1;
                } else if ([1, 4, 7].includes(step.location)) {
                    return 2;
                } else if ([2, 5, 8].includes(step.location)) {
                    return 3;
                }
            };

            let row = () => {
                if ([0, 1, 2].includes(step.location)) {
                    return 1;
                } else if ([3, 4, 5].includes(step.location)) {
                    return 2;
                } else if ([6, 7, 8].includes(step.location)) {
                    return 3;
                }
            };
            const desc = move // button description
                ? `Go to move #${move}
                (col: ${col()}, row: ${row()})`
                : `Go to game start`;
            return (
                // sequential number of the move as a key - key should be unique, like id attribute
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {this.state.stepNumber === move ? (
                            <strong>{desc}</strong>
                        ) : (
                            desc
                        )}
                    </button>
                </li>
                // regular if-else statements doesn't work inside JSX, but ternary operator do,
                // also you can nest the jsx inside of an if-else expression, or use && operator.
                // && evaluates only when the condition evaluates to true. {x && y} will render y only when x is true
            );
        });

        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winningSquares={winner ? winningSquares : []}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <h1>tic-tac-toe</h1>
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
