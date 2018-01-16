import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from 'redux-oauth';
import { withRouter } from "react-router-dom";

import { isUserSignedIn } from 'redux/models/user';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  userSignedIn: PropTypes.bool.isRequired
};

class SignOutButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(signOut());

    this.props.history.replace("/");
  }

  render() {
    if (!this.props.userSignedIn) {
      return null;
    }

    return <button href="" className="sign-out" onClick={this.handleClick}>Sign Out</button>;
  }
}

SignOutButton.propTypes = propTypes;

function mapStateToProps(state) {
  return { userSignedIn: isUserSignedIn(state) };
}

export default withRouter(connect(mapStateToProps)(SignOutButton));
