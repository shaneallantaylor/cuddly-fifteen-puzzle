import React, { Component } from 'react';
import './../styles/Board.css';


import Tile from './Tile';

const AnimateLoad = (WrappedComponent) => {
  return class extends React.Component {
    state = { didMount: false }
    componentDidMount() {
      setTimeout(() => {
        this.setState({ didMount: true })
      }, 0)
    }
    render() {
      const { didMount } = this.state
      return (
        <div className={`fade-in ${didMount && 'visible'}`}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
}



class Board extends Component {


  render() {

    const tileArray = [];

    for (let i = 1; i <= 16; i += 1) {
      tileArray.push(<Tile
        tilePosition={i - 1}
        imageUrl={this.props.imageUrl}
        number={this.props.tilePositions[i - 1]}
        key={this.props.tilePositions[i - 1]}
        swapTileAndCheckForWin={this.props.swapTileAndCheckForWin}
        emptyPosition={this.props.emptyPosition} />)
    }
    return (
      <div
        id="board"
        style={{ backgroundImage: 'url(' + this.props.imageUrl + ')' }}
        className={`${this.props.numbersVisible ? 'numbers-visible' : 'no-help'} ${this.props.puzzleSolved ? 'gameover' : 'gameplay'}`} >
        {tileArray}
      </div>
    );
  }
}

export default AnimateLoad(Board);
