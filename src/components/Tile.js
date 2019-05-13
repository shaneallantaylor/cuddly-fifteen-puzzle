import React, { Component } from 'react';
import './../styles/Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoveable: false,
    }
  }

  makeMoveable() {
    this.setState(() => {
      return {
        isMoveable: true
      }
    })
  }

  makeUnmoveable() {
    this.setState(() => {
      return {
        isMoveable: false
      }
    })
  }



  componentWillMount() {
    if (this.props.tilePosition + 4 === 15) {
      this.makeMoveable()
    } else if (this.props.tilePosition - 4 === 15) {
      this.makeMoveable()
    } else if (this.props.tilePosition + 1 === 15) {
      this.makeMoveable()
    } else if (this.props.tilePosition - 1 === 15) {
      this.makeMoveable()
    } else {
      this.makeUnmoveable()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tilePosition + 4 === nextProps.emptyPosition) {
      this.makeMoveable()
    } else if (nextProps.tilePosition - 4 === nextProps.emptyPosition) {
      this.makeMoveable()
    } else if (nextProps.tilePosition + 1 === nextProps.emptyPosition && (nextProps.emptyPosition !== 4 && nextProps.emptyPosition !== 8 && nextProps.emptyPosition !== 12)) {
      this.makeMoveable()
    } else if (nextProps.tilePosition - 1 === nextProps.emptyPosition && (nextProps.emptyPosition !== 3 && nextProps.emptyPosition !== 7 && nextProps.emptyPosition !== 11)) {
      this.makeMoveable()
    } else {
      this.makeUnmoveable()
    }
  }


  render() {
    return (

      <div onClick={((e) => this.props.swapTileAndCheckForWin(this.props.number, this.props.tilePosition))} style={{
        backgroundImage: 'url(' + this.props.imageUrl + ')',
        order: `${this.props.tilePosition}`,
      }}
        className={`tile  tile-number-${this.props.number} 
        ${this.state.isMoveable ? 'moveable-tile' : 'inactive-tile'} 
        ${this.props.tilePosition === this.props.emptyPosition ? 'empty' : null}`}>
        <span>{this.props.number}</span>
      </div>
    );
  }
}

export default Tile;
