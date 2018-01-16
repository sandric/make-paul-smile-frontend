import React from 'react';
import { connect } from 'react-redux';

import { selectCell } from '../../redux/actions/gameActions'


class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  cellClasses() {
    let classes = ['cell']
    if(this.props.piece) classes.push(this.props.piece)
    if(this.props.selected) classes.push('selected')
    if(this.props.hinting) classes.push('hinting')

    return classes.join(" ")
  }

  click() {
    this.props.clickHandler(this.props.id)
  }

  render() {
    return (
      <div className={this.cellClasses()}
           onClick={() => this.props.onSelectCell()}>
      </div>
    );
  };
};

function mapStateToProps(state, props) {
  const { piece, selected, hinting } = state.game.board.cells[props.id];

  return { piece, selected, hinting };
}

function mapDispatchToProps(dispatch, props) {
  return {
    onSelectCell: () => {
      dispatch(selectCell(props.id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
