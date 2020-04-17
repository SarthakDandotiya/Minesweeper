import React, { Component } from 'react';
import Tile from './Tile';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            board: this.createBoard(),
            flags: 0,
            correct: 0
        }
    }

    createBoard = () => {
        // initializing the board - 2D array of objects
        let board = [];
        for (let i = 0; i < 9; i++) {
            board[i] = [];
            for (let j = 0; j < 9; j++) {
                board[i][j] = {
                    value: 0,
                    reveal: false,
                    flag: false,
                }
            }
        }

        // planting Mines
        let minesPlanted = 0, x, y;

        while (minesPlanted < 10) {
            x = this.randomNumber8();
            y = this.randomNumber8();

            if (board[x][y].value < 99) {
                board[x][y].value = 99;
                minesPlanted++;
            }
        }

        // Updating values around the mine
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {

                // # # # => tL  tC  tR
                // # X # => L  Mine  R
                // # # # => bL  bC  bR

                // TODO: Remove Unneccesary Checks
                if (board[i][j].value > 90) {
                    const tL = ((i - 1) >= 0) && ((j - 1) >= 0) && ((i - 1) <= 8) && ((j - 1) <= 8)
                    const tC = ((i - 1) >= 0) && ((j) >= 0) && ((i - 1) <= 8) && ((j) <= 8)
                    const tR = ((i - 1) >= 0) && ((j + 1) >= 0) && ((i - 1) <= 8) && ((j + 1) <= 8)

                    const L = ((i) >= 0) && ((j - 1) >= 0) && ((i) <= 8) && ((j - 1) <= 8)
                    const R = ((i) >= 0) && ((j + 1) >= 0) && ((i) <= 8) && ((j + 1) <= 8)

                    const bL = ((i + 1) >= 0) && ((j - 1) >= 0) && ((i + 1) <= 8) && ((j - 1) <= 8)
                    const bC = ((i + 1) >= 0) && ((j) >= 0) && ((i + 1) <= 8) && ((j) <= 8)
                    const bR = ((i + 1) >= 0) && ((j + 1) >= 0) && ((i + 1) <= 8) && ((j + 1) <= 8)

                    if (tL)
                        board[i - 1][j - 1].value += 1
                    if (tC)
                        board[i - 1][j].value += 1
                    if (tR)
                        board[i - 1][j + 1].value += 1
                    if (L)
                        board[i][j - 1].value += 1
                    if (R)
                        board[i][j + 1].value += 1
                    if (bL)
                        board[i + 1][j - 1].value += 1
                    if (bC)
                        board[i + 1][j].value += 1
                    if (bR)
                        board[i + 1][j + 1].value += 1
                }
            }
        }

        return board
    }

    randomNumber8 = () => {
        // Returns random number between 0 and 8
        return Math.floor((Math.random() * 1000) + 1) % 8;
    }

    incrementFlags = (i, j) => {
        let flags = this.state.flags;
        let board = this.state.board;

        if (flags < 10)
            flags++;
        board[i][j].flag = true;

        this.setState({
            board: board,
            flags: flags
        })
    }

    deccrementFlags = (i, j) => {
        let flags = this.state.flags;
        let board = this.state.board;

        if (flags > 0)
            flags--;
        board[i][j].flag = false;

        this.setState({
            board: board,
            flags: flags
        })
    }

    revealAll = () => {
        let board = this.state.board
        board.forEach(row => {
            row.forEach(obj => {
                obj.reveal = true;
            })
        })

        this.setState({
            board: board,
            flags: 0
        })
    }

    updateSurroundingNull = (i, j) => {

        // recursively updates all 0's surrounding to -1

        let board = this.state.board;
        let flags = this.state.flags;

        if (board[i][j].value <= 0) {
            const tL = ((i - 1) >= 0) && ((j - 1) >= 0) && ((i - 1) <= 8) && ((j - 1) <= 8)
            const tC = ((i - 1) >= 0) && ((j) >= 0) && ((i - 1) <= 8) && ((j) <= 8)
            const tR = ((i - 1) >= 0) && ((j + 1) >= 0) && ((i - 1) <= 8) && ((j + 1) <= 8)

            const L = ((i) >= 0) && ((j - 1) >= 0) && ((i) <= 8) && ((j - 1) <= 8)
            const R = ((i) >= 0) && ((j + 1) >= 0) && ((i) <= 8) && ((j + 1) <= 8)

            const bL = ((i + 1) >= 0) && ((j - 1) >= 0) && ((i + 1) <= 8) && ((j - 1) <= 8)
            const bC = ((i + 1) >= 0) && ((j) >= 0) && ((i + 1) <= 8) && ((j) <= 8)
            const bR = ((i + 1) >= 0) && ((j + 1) >= 0) && ((i + 1) <= 8) && ((j + 1) <= 8)

            if (tL && board[i - 1][j - 1].reveal === false) {
                board[i - 1][j - 1].reveal = true;
                if (board[i - 1][j - 1].flag === true) {
                    flags--;
                    this.setState({ flags: flags });
                }
                this.updateSurroundingNull(i - 1, j - 1)
            }
            if (tC && board[i - 1][j].reveal === false) {
                board[i - 1][j].reveal = true;
                if (board[i - 1][j].flag === true) {
                    flags--;
                    this.setState({ flags: flags });
                }
                this.updateSurroundingNull(i - 1, j)
            }
            if (tR && board[i - 1][j + 1].reveal === false) {
                board[i - 1][j + 1].reveal = true;
                if (board[i - 1][j + 1].flag === true) {
                    flags--;
                    this.setState({ flags: flags });
                }
                this.updateSurroundingNull(i - 1, j + 1)
            }
            if (L && board[i][j - 1].reveal === false) {
                board[i][j - 1].reveal = true;
                if (board[i][j - 1].flag === true) {
                    flags--;
                    this.setState({ flags: flags });
                }
                this.updateSurroundingNull(i, j - 1)
            }
            if (R && board[i][j + 1].reveal === false) {
                board[i][j + 1].reveal = true;
                if (board[i][j + 1].flag === true) {
                    flags--;
                    this.setState({ flags: flags });
                }
                this.updateSurroundingNull(i, j + 1)
            }
            if (bL && board[i + 1][j - 1].reveal === false) {
                board[i + 1][j - 1].reveal = true;
                if (board[i + 1][j - 1].flag === true) {
                    flags--;
                    this.setState({ flags: flags });
                }
                this.updateSurroundingNull(i + 1, j - 1)
            }
            if (bC && board[i + 1][j].reveal === false) {
                board[i + 1][j].reveal = true;
                if (board[i + 1][j].flag === true) {
                    flags--;
                    this.setState({ flags: flags });
                }
                this.updateSurroundingNull(i + 1, j)
            }
            if (bR && board[i + 1][j + 1].reveal === false) {
                board[i + 1][j + 1].reveal = true;
                if (board[i + 1][j + 1].flag === true) {
                    flags--;
                    this.setState({ flags: flags });
                }
                this.updateSurroundingNull(i + 1, j + 1)
            }
        }


        this.setState({
            board: board,
        })

    }

    displayBoard = (array) => {

        return array.map((row, i) => {
            let tile = row.map((obj, j) => {
                return (
                    <Tile
                        value={ obj.value }
                        key={ i.toString() + j.toString() }
                        i={ i } j={ j }
                        usn={ this.updateSurroundingNull }
                        iF={ this.incrementFlags }
                        dF={ this.deccrementFlags }
                        flagCount={ this.state.flags }
                        flagable={ (this.state.flags >= 0 && this.state.flags <= 10) ? true : false }
                        reveal={ obj.reveal }
                        revealAll={ this.revealAll }
                    />
                )
            })

            return (
                <div className="row" key={ i }>
                    { tile }
                </div>
            )
        })

    }

    render() {
        return (
            <div className="board">
                { this.displayBoard(this.state.board) }
                <br />
                <p>Flags: { this.state.flags }</p>
            </div>
        );
    }
}

export default Board;