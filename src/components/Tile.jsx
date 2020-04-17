import React, { Component } from 'react';
import Holdable from './Holdable';

import mine from '../images/mine.png';
import flag from '../images/flag.png';

class Tile extends Component {
    state = {
        held: false,
        clicked: this.props.reveal
    }

    handleClick = () => {
        if (!this.state.held)
            this.setState({ clicked: true })
        if (this.props.value === 0)
            this.props.usn(this.props.i, this.props.j);
    }

    handleHold = () => {
        if (!this.state.clicked)
            this.setState({ held: !this.state.held })
    }

    displayFlag = () => {
        return <img src={ flag } alt="flaged" className="flag" />
    }

    displayData = (value) => {
        if (value >= 99) {
            return <img src={ mine } alt="mine" className="mine" />
        } else {
            return <p className="value"> { value <= 0 ? null : value }</p>
        }
    }

    render() {
        return (
            <Holdable className="holdable" onClick={ this.handleClick } onHold={ this.handleHold }>
                <div className={ this.state.clicked || this.props.reveal ? "tile_clicked" : "tile" }>
                    { this.state.held ? this.displayFlag() : null }
                    { this.state.clicked ? this.displayData(this.props.value) : null }
                </div>
            </Holdable >
        );
    }
}

export default Tile;