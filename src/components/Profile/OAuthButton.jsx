import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { oAuthSignIn } from 'redux-oauth';
import { isUserSignedIn } from 'redux/models/user';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  provider: PropTypes.string.isRequired,
  userSignedIn: PropTypes.bool.isRequired
};

class OAuthButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatch, provider } = this.props;

    dispatch(oAuthSignIn({ provider }));
  }

  render() {
    const { loading, provider, userSignedIn } = this.props;

    if (userSignedIn) {
      return null;
    }

    return <button onClick={this.handleClick}>{provider}</button>;
  }
}

OAuthButton.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
  const loading = state.auth.getIn(['oAuthSignIn', ownProps.provider, 'loading']) || false;

  return { userSignedIn: isUserSignedIn(state), loading };
}

export default connect(mapStateToProps)(OAuthButton);
