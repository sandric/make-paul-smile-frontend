import { SIGN_OUT } from 'redux-oauth';
import { OPENINGS_REQUEST_STARTED, OPENINGS_REQUEST_FINISHED, OPENINGS_REQUEST_ERROR, OPENING_REQUEST_STARTED, OPENING_REQUEST_FINISHED, OPENING_REQUEST_ERROR, UPDATE_STATUS, RIGHT_MOVE, WRONG_MOVE, MOVE, SHOW_HINT, CLEAR_BOARD, SELECT_CELL, END_OPENING, SKIP_OPENING, START_GAME, END_GAME } from 'redux/actions/gameActions';

const initialState = {
  loading: false,
  errors: null,
  openings: null,
  opening: null,
  status: 'Some status',
  rightMoves: 0,
  wrongMoves: 0,
  movesNotation: 'Some moves. Some moves. Some moves. Some moves. Some moves.',
  hints: 0,
  completed: 0,
  skipped: 0,
  started: false,
  ended: false,
  board: {
    cells: [],
    currentMove: 0,
    selected: null
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
  case OPENINGS_REQUEST_STARTED: {
    return Object.assign({}, state, { loading: true, errors: null });
  }
  case OPENINGS_REQUEST_FINISHED: {
    return Object.assign({}, state, {
      loading: false,
      errors: null,
      openings: action.openings
    });
  }
  case OPENINGS_REQUEST_ERROR: {
    return Object.assign({}, state, { loading: false, errors: action.errors });
  }
  case OPENING_REQUEST_STARTED: {
    return Object.assign({}, state, { loading: true, errors: null });
  }
  case OPENING_REQUEST_FINISHED: {
    return Object.assign({}, state, {
      loading: false,
      errors: null,
      opening: action.opening,
      openings: state.openings.filter((id) => id != action.opening.id)
    });
  }
  case OPENING_REQUEST_ERROR: {
    return Object.assign({}, state, { loading: false, errors: action.errors });
  }
  case UPDATE_STATUS: {
    return Object.assign({}, state, { status: action.status });
  }
  case RIGHT_MOVE: {
    return Object.assign({}, state, {
      rightMoves: state.rightMoves + 1,
      movesNotation: `${state.movesNotation} ${action.moveNotation}`,
      status: "Thatts right"
    });
  }
  case WRONG_MOVE: {
    return Object.assign({}, state, {
      wrongMoves: state.wrongMoves + 1,
      status: "Wrong move.."
    });
  }
  case MOVE: {
    return Object.assign({}, state, { board: action.board });
  }

    
  case SHOW_HINT: {
    let cells = state.board.cells
    const hintFrom = state.opening.moves[state.board.currentMove].from
    const hintTo = state.opening.moves[state.board.currentMove].to

    cells[hintFrom].hinting = true
    cells[hintTo].hinting = true

    return Object.assign({}, state, {
      hints: state.hints + 1,
      board: Object.assign({}, state.board, {
        cells: cells
      })
    });
  }


  case SELECT_CELL: {
    return Object.assign({}, state, { board: action.board });
  }

  case CLEAR_BOARD: {
    return Object.assign({}, state, {
      board: {
        cells: action.cells,
        currentMove: 0,
        selected: null
      }
    });
  }

  case END_OPENING: {
    return Object.assign({}, state, { completed: state.completed + 1 });
  }
  case SKIP_OPENING: {
    return Object.assign({}, state, { skipped: state.skipped + 1 });
  }
  case START_GAME: {
    return Object.assign({}, state, { started: true, ended: false });
  }
  case END_GAME: {
    return Object.assign({}, state, { started: false, ended: true });
  }

  case SIGN_OUT:
    return initialState;
  default:
    return state;
  }
}
