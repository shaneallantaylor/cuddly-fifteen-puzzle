import React, { Component } from 'react';
import './../styles/GameOver.css';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbersVisible: false,
    }
    this.toggleNumbersVisible = this.toggleNumbersVisible.bind(this);
  }

  toggleNumbersVisible() {
    this.setState((prevState) => {
      return {
        numbersVisible: !prevState.numbersVisible
      }
    })
  }

  render() {
    return (
      <div className="controls-container">
        <h2>Congratulations!</h2>
        <div className="moves-count-container">
          <h3>You solved the puzzle in {this.props.movesCount} moves</h3>
        </div>
      </div>
    );
  }
}

export default GameOver;
