import React from 'react';
import { connect } from 'react-redux';

import Cell from './Cell';

import { rightMove, wrongMove } from '../../redux/actions/gameActions'


class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chessboard">
        {this.props.board.cells.map((cell, index) => 
                                    <Cell key={index} id={index}/>
                                   )}
      </div>
    );
  };
};

function mapStateToProps(state) {
  const { board } = state.game;
  const { currentMove } = state.game.board;
  
  const moves = state.game.opening.moves;

  return { board, moves };
}

function mapDispatchToProps(dispatch) {
  return {
    onRightMove: (moveNotation) => {
      dispatch(rightMove(moveNotation))
    },
    onWrongMove: () => {
      dispatch(wrongMove());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
