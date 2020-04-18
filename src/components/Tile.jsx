import React, { Component } from 'react';
import Holdable from './Holdable';

import mine from '../images/mine.png';
import flag from '../images/flag.png';

class Tile extends Component {
    state = {
        held: false,
        clicked: false
    }

    handleClick = () => {
        if (this.state.held === false && this.props.reveal === false)
            this.setState({ clicked: true })
        if (this.props.value === 0 && this.state.held === false && this.props.flag === false)
            this.props.usn(this.props.i, this.props.j);
        if (this.state.held === false && this.props.reveal === false && this.props.value > 90)
            this.props.revealAll()
    }

    handleHold = () => {
        if (this.state.clicked === false && this.props.reveal === false) {
            // this.setState({ held: !this.state.held })
            // if (this.state.held === true && this.props.flagCount > 0)
            if (this.props.flag === true && this.props.flagCount > 0) {
                this.setState({ held: false })
                this.props.dF(this.props.i, this.props.j)
            }
            // else if (this.state.held === false && this.props.flagCount < 10)
            else if (this.props.flag === false && this.props.flagCount < 10) {
                this.setState({ held: true })
                this.props.iF(this.props.i, this.props.j)
            }
        }
    }

    displayFlag = () => {
        if (this.props.reveal === false) {
            return <img src={ flag } alt="flaged" className="flag" />
        }
    }

    displayData = (value, reveal) => {
        if (value >= 99) {
            return <img src={ mine } alt="mine" className="mine" />
        } else {
            return <p className={ "value c" + value.toString() }> { reveal ? (value === 0 ? null : value) : value }</p>
        }
    }

    render() {
        return (
            <Holdable className="holdable" onClick={ this.handleClick } onHold={ this.handleHold }>
                <div className={ this.state.clicked || this.props.reveal ? "tile_clicked" : "tile" }>
                    { this.state.held ? this.displayFlag() : null }
                    { this.state.clicked || this.props.reveal ? this.displayData(this.props.value, this.props.reveal) : null }
                </div>
            </Holdable >
        );
    }
}

export default Tile;