import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openingsRequest, getNextOpening, updateStatus, skipOpening, startGame, endGame, showHint } from '../../redux/actions/gameActions'

import Board from './Board';

import './Game.css';

const propTypes = {
  // loading: PropTypes.bool.isRequired,
  // openings: PropTypes.any,
  // opening: PropTypes.any
};


class Game extends React.Component {
  static fetchData(dispatch) {
    return dispatch(openingsRequest())
  }
  
  constructor(props) {
    super(props)
  }

  gameProgress() {
    const style = {
      width: "50%"
    }

    return (
      <div className="progress-bar">
        <div className="progress-highlight" style={style}></div>
      </div>
    )
  }

  openingProgress() {
    const style = {
      width: "30%"
    }

    return (
      <div className="progress-bar">
        <div className="progress-highlight" style={style}></div>
      </div>
    )    
  }

  renderDescription() {
    return (
      <main className="game">
        <h1>Subject Title 1</h1>
        <div className="description">
          <p>An Open Game (or Double King's Pawn Opening) is a chess opening that begins with the following moves: 1. e4 e5</p>
          <p>White has moved the king's pawn two squares and Black has replied in kind. The result is an Open Game. Other responses to 1.e4 are termed Semi-Open Games or Single King's Pawn Games.</p>
          <p>It should not be confused with the term "open game" (small o), referring to a chess position where ranks, files and diagonals are open, and tending to more tactical gameplay.</p>
        </div>

        <button className="startGame" onClick={this.props.onStartGame}>Start Game</button>
      </main>
    )    
  }

  renderResults() {
    return (
      <main className="game">
        <h1>Subject Title 1</h1>
        <div className="result">
          das results:
          <div className="completed">Completed: {this.props.completed}</div>
          <div className="skipped">Skipped: {this.props.skipped}</div>
          <div className="hints">Hints: {this.props.hints}</div>
          <div className="right_moves">Right Moves: {this.props.rightMoves}</div>
          <div className="wrong_moves">Wrong Moves: {this.props.wrongMoves}</div>
        </div>
      </main>
    )
  }

  renderGame() {
    return (
      <main className="game">
        <h1>Subject Title 1</h1>
        <h2>{this.props.opening.title}</h2>

        <div className="game">
          <Board/>

          <div className="controls">
            <div className="progresses">
              <div className="progress">
                <p>Game Progress: <span>5/10</span></p>
                {this.gameProgress()}
              </div>

              <div className="progress">
                <p>Opening Progress: <span>3/5</span></p>
                {this.openingProgress()}
              </div>
            </div>

            <div className="status">
              <img alt="" src="./paul-avatar.png"/>
              <div className="status-text">
                {this.props.status}
              </div>
            </div>

            <div className="moves">
              {this.props.movesNotation}
            </div>

            <div className="scores">
              <table>
                <tbody>
                  <tr>
                    <td className="right-moves">Right: <span>7</span></td>
                    <td className="completed">Completed: <span>17</span></td>
                    <td className="hints">Hints: <span>7</span></td>
                  </tr>
                  <tr>
                    <td className="wrong-moves">Wrong: <span>17</span></td>
                    <td className="skipped">Skipped: <span>7</span></td>
                    <td className="total">Total: <span>777</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="buttons">
              <button className="skipOpening"
                      disabled={!this.props.openings.length}
                      onClick={this.props.onSkipOpening}>Skip</button>
              <button className="showHint" onClick={this.props.showHint}>Hint</button>
              <button className="endGame" onClick={this.props.onEndGame}>End</button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  render() {
    if(this.props.ended)
      return this.renderResults()
    else if(!this.props.started && !this.props.ended)
      return this.renderDescription()
    else if(this.props.opening)
      return this.renderGame()
    else
      return null;
  }
}

Game.propTypes = propTypes;

function mapStateToProps(state) {
  const { loading, openings, opening, status, movesNotation, completed, skipped, started, ended, hints, wrongMoves, rightMoves } = state.game;

  return { loading, openings, opening, status, movesNotation, completed, skipped, started, ended, hints, wrongMoves, rightMoves };
}

function mapDispatchToProps(dispatch) {
  return {
    getOpenings: () => {
      dispatch(openingsRequest())
    },
    onGetNextOpening: () => {
      dispatch(getNextOpening())
    },
    updateStatus: (newStatus) => {
      dispatch(updateStatus(newStatus))
    },
    onStartGame: () => {
      dispatch(startGame())
    },
    onEndGame: () => {
      dispatch(endGame())
    },
    onSkipOpening: () => {
      dispatch(skipOpening())
    },
    showHint: () => {
      dispatch(showHint());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
