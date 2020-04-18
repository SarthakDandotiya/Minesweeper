import React, { Component } from 'react';
import Board from './components/Board';

class Game extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <h2>Minesweeper</h2>
                <p>Click tile to reveal & hold to flag,
                    <br />Flag all mines to win.</p>
                <Board className="board" />
            </React.Fragment>
        );
    }
}

export default Game;