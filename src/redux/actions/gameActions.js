import { fetch, parseResponse } from 'redux-oauth';
import { isUserSignedIn } from '../models/user';
import formatMoveChessNotation from '../../common/notation';


export const OPENINGS_REQUEST_STARTED = 'OPENINGS_REQUEST_STARTED';
export const OPENINGS_REQUEST_FINISHED = 'OPENINGS_REQUEST_FINISHED';
export const OPENINGS_REQUEST_ERROR = 'OPENINGS_REQUEST_ERROR';

export const OPENING_REQUEST_STARTED = 'OPENING_REQUEST_STARTED';
export const OPENING_REQUEST_FINISHED = 'OPENING_REQUEST_FINISHED';
export const OPENING_REQUEST_ERROR = 'OPENING_REQUEST_ERROR';

export const GET_NEXT_OPENING = 'GET_NEXT_OPENING';

export const UPDATE_STATUS = 'UPDATE_STATUS';

export const RIGHT_MOVE = 'RIGHT_MOVE';
export const WRONG_MOVE = 'WRONG_MOVE';
export const MOVE = 'MOVE';

export const SHOW_HINT = 'SHOW_HINT';


export const CLEAR_BOARD = 'CLEAR_BOARD';
export const SELECT_CELL = 'SELECT_CELL';

export const END_OPENING = 'END_OPENING';
export const SKIP_OPENING = 'SKIP_OPENING';

export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';


function openingsRequestStarted() {
  return { type: OPENINGS_REQUEST_STARTED };
}

function openingsRequestFinished(openings) {
  return { type: OPENINGS_REQUEST_FINISHED, openings };
}

function openingsRequestError(errors) {
  return { type: OPENINGS_REQUEST_ERROR, errors };
}

export function openingsRequest() {
  return (dispatch, getState) => {
    if (!isUserSignedIn(getState())) {
      return Promise.resolve();
    }

    dispatch(openingsRequestStarted());

    return dispatch(fetch('http://localhost:4000/openings'))
      .then(parseResponse)
      .then(({ openings }) => dispatch(openingsRequestFinished(openings)))
      .catch((errors) => dispatch(openingsRequestError(errors)));
  };
}

export function openingRequestStarted() {
  return { type: OPENING_REQUEST_STARTED };
}

export function openingRequestFinished(opening) {
  return (dispatch, getState) => {
    dispatch(clearBoard());
    return dispatch({ type: OPENING_REQUEST_FINISHED, opening });
  }
}

function openingRequestError(errors) {
  return { type: OPENING_REQUEST_ERROR, errors };
}

function openingRequest(id) {
  return (dispatch, getState) => {
    if (!isUserSignedIn(getState())) {
      return Promise.resolve();
    }

    dispatch(openingRequestStarted());

    return dispatch(fetch(`http://localhost:4000/openings/${id}`))
      .then(parseResponse)
      .then(({ payload }) => dispatch(openingRequestFinished(payload.opening)))
      .catch(({ errors }) => dispatch(openingRequestError(errors)));
  };
}

export function getNextOpening() {
  return (dispatch, getState) => {
    let openings = getState().game.openings;
    const next_id = openings.pop();

    return dispatch(openingRequest(next_id));
  }
}

export function updateStatus(newStatus) {
  return { type: UPDATE_STATUS, status: newStatus };
}

export function rightMove(moveNotation) {
  return { type: RIGHT_MOVE, moveNotation };
}

export function wrongMove() {
  return { type: WRONG_MOVE };
}

export function showHint() {
  return { type: SHOW_HINT };
}

export function clearBoard() {
  let cells = [];
  for(var id = 0; id < 64; id++) cells.push({piece: null, id});

  for(var id = 8; id < 16; id++) cells[id].piece = 'black-pawn';
  for(var id = 48; id < 56; id++) cells[id].piece = 'white-pawn';

  cells[0].piece = "black-rock";
  cells[1].piece = "black-knight";
  cells[2].piece = "black-bishop";
  cells[3].piece = "black-quine";
  cells[4].piece = "black-king";
  cells[5].piece = "black-bishop";
  cells[6].piece = "black-knight";
  cells[7].piece = "black-rock";

  cells[56].piece = "white-rock";
  cells[57].piece = "white-knight";
  cells[58].piece = "white-bishop";
  cells[59].piece = "white-quine";
  cells[60].piece = "white-king";
  cells[61].piece = "white-bishop";
  cells[62].piece = "white-knight";
  cells[63].piece = "white-rock";

  return { type: CLEAR_BOARD, cells };
}

export function selectCell(id) {
  return (dispatch, getState) => {
    let board = getState().game.board;
    let cells = board.cells

    if(board.selected) {
      if(id != board.selected)
        dispatch(move(board.selected, id));
      cells[id].selected = false;

      board.cells = cells;
      board.selected = null; 
    } else {
      if(board.cells[id].piece) {
        cells[id].selected = true;

        board.cells = cells;
        board.selected = id;
      }
    }

    return dispatch({ type: SELECT_CELL, id, board });
  }
}

export function move(from, to) {
  return (dispatch, getState) => {

    let board = getState().game.board;
    
    if(from == getState().game.opening.moves[board.currentMove].from &&
       to == getState().game.opening.moves[board.currentMove].to) {
      const moveNotation = formatMoveChessNotation(board.cells[from], board.cells[to], board.currentMove)

      board.cells[to].piece = board.cells[from].piece
      board.cells[from].piece = null

      board.currentMove = board.currentMove + 1;

      board.cells[from].hinting = false
      board.cells[to].hinting = false

      if(board.currentMove >= getState().game.opening.moves.length) {
        dispatch(rightMove(moveNotation))
        dispatch(endOpening());
      } else
        dispatch(rightMove(moveNotation))
    } else {
      dispatch(wrongMove())
    }

    board.cells[from].selected = false
    board.cells[to].selected = false

    return { type: MOVE, board };
  }
}

export function endOpening() {
  return (dispatch, getState) => {
    dispatch({ type: END_OPENING });

    if(!getState().game.openings.length)
      dispatch(endGame())
    else
      dispatch(getNextOpening())
  }
}

export function skipOpening() {
  return (dispatch, getState) => {
    dispatch(getNextOpening())
    return dispatch({ type: SKIP_OPENING });
  }
}

export function startGame() {
  return (dispatch, getState) => {
    dispatch(getNextOpening())
    return dispatch({ type: START_GAME });
  }
}

export function endGame() {  
  return { type: END_GAME };
}
