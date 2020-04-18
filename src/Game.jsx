import React, { Component } from 'react';
import Board from './components/Board';

class Game extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <h2>Minesweeper</h2>
                <br />
                <Board className="board" />
            </React.Fragment>
        );
    }
}

export default Game;