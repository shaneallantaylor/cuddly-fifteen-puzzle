import React, { Component } from 'react';
import './../styles/GameOptions.css';

class GameOptions extends Component {

  render() {
    return (
      <div className="game-options-container">
        <h2>Game Options</h2>
        <button onClick={this.props.toggleNumbersVisible}>Enable {this.props.numbersVisible ? 'Difficult Mode' : 'Easy Mode'}</button>
        <div className="moves-count-container">
          <h3>Number of moves:</h3>
          <h4>{this.props.movesCount}</h4>
        </div>
      </div>
    );
  }
}

export default GameOptions;
