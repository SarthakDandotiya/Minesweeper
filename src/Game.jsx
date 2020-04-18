import React, { Component } from 'react';
import Board from './components/Board';

class Game extends Component {
    state = {}
    render() {
        return (
            <div>
                <h2>Minesweeper</h2>
                <br />
                <Board />
            </div>
        );
    }
}

export default Game;