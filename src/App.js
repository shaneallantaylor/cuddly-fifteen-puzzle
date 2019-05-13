import React, { Component } from 'react';
import './styles/App.css';

import Board from './components/Board';
import GameOptions from './components/GameOptions';
import GameOver from './components/GameOver';
import Loading from './components/Loading';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilePositions: [],
      isLoading: true,
      imageUrl: null,
      emptyPosition: 15,
      movesCount: 0,
      puzzleSolved: false,
      numbersVisible: false,
    }
    this.toggleNumbersVisible = this.toggleNumbersVisible.bind(this);
    this.swapTileAndCheckForWin = this.swapTileAndCheckForWin.bind(this);
  }

  shuffle(array) {
    const shuffledArray = [...array];
    let numberOfElements = shuffledArray.length;
    let remainingElement;
    let temporaryPointer;
    // While there remain elements to shuffle…
    while (numberOfElements) {
      // Pick a remaining element…
      remainingElement = Math.floor(Math.random() * numberOfElements--);
      // And swap it with the current element.
      temporaryPointer = shuffledArray[numberOfElements];
      shuffledArray[numberOfElements] = shuffledArray[remainingElement];
      shuffledArray[remainingElement] = temporaryPointer;
    }
    return shuffledArray;
  }

  swapTileAndCheckForWin(tileNum, tilePos) {
    console.log('swap tile has been run');
    const newEmptyPosition = tilePos;
    const tileNumber = tileNum;
    this.setState((prevState) => {
      const newTilePositions = [...prevState.tilePositions];
      newTilePositions[prevState.emptyPosition] = tileNumber;
      newTilePositions[newEmptyPosition] = 16;
      let newPuzzleSolved = true;
      for (let i = 0; i < newTilePositions.length; i += 1) {
        if (i + 1 !== newTilePositions[i]) {
          newPuzzleSolved = false;
        }
      }
      return {
        tilePositions: newTilePositions,
        emptyPosition: newEmptyPosition,
        movesCount: prevState.movesCount += 1,
        puzzleSolved: newPuzzleSolved,

      }
    })

  }

  toggleNumbersVisible() {
    this.setState((prevState) => {
      return {
        numbersVisible: !prevState.numbersVisible
      }
    })
  }



  componentWillMount() {
    fetch(`https://source.unsplash.com/random/500x500/?cat`)
      .then((response) => {
        this.setState(() => {
          return {
            isLoading: false,
            imageUrl: response.url,
          }
        });
      })

    const numberArray = [];
    for (var i = 1; i <= 15; i++) {
      numberArray.push(i);
    }


    const shuffledArray = this.shuffle(numberArray);
    shuffledArray.push(16);


    const calculateInversions = arr => {
      let inversionCount = 0;
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          // count pairs(i, j) such that i appears 
          // before j, but i > j. 
          if (arr[j] && arr[i] && arr[i] > arr[j])
            inversionCount += 1;
        }
      }
      return inversionCount;
    }

    if (calculateInversions(shuffledArray) % 2 !== 0) {
      [shuffledArray[0], shuffledArray[1]] = [shuffledArray[1], shuffledArray[0]]
    }
    this.setState(() => {
      return {
        tilePositions: shuffledArray,
      }
    })
  }

  render() {
    return (
      <div className="app">
        <h1 id="title">Cuddly Fifteen Puzzle</h1>
        {this.state.puzzleSolved ? <GameOver movesCount={this.state.movesCount} /> : <GameOptions numbersVisible={this.state.numbersVisible} toggleNumbersVisible={this.toggleNumbersVisible} movesCount={this.state.movesCount} />}
        {this.state.isLoading ? <Loading /> : <Board
          numbersVisible={this.state.numbersVisible}
          tilePositions={this.state.tilePositions}
          movesCount={this.state.movesCount}
          puzzleSolved={this.state.puzzleSolved}
          imageUrl={this.state.imageUrl}
          swapTileAndCheckForWin={this.swapTileAndCheckForWin}
          emptyPosition={this.state.emptyPosition} />}
      </div>
    );
  }
}

export default App;
