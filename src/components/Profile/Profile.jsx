import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import User from './User.jsx';
import Authorize from './Authorize.jsx';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.isSignedIn)
      return (
        <User/>
      )
    else
      return (
        <Authorize/>
      );
  }
}

function mapStateToProps(state) {
  const isSignedIn = state.auth.getIn(['user', 'isSignedIn']);
  return { isSignedIn };
}

export default connect(mapStateToProps)(Profile);
