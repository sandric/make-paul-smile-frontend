import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import fetch from 'isomorphic-unfetch';

import { userUpdateRequest } from '../../redux/actions/profileActions'

import SignOutButton from './SignOutButton';

import './User.css'

class User extends Component {
  constructor(props) {
    super(props)
  }

  onDropRejected() {
  }

  render() {
    return (
      <main className="profile"> 
        <h1>Account</h1>
        <div className="account">
          <Dropzone className='dropzone' onDrop={ this.props.updateUser.bind(this) } accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png" multiple={ false } onDropRejected={ this.onDropRejected }>
            <img alt="" src={this.props.image}/>
          </Dropzone>
          <div className="attributes">
            <p><span>Name:</span>{this.props.name}</p>
            <p><span>Email:</span>{this.props.email}</p>
            <p><span>Logged in with:</span>{this.props.provider}</p>
          </div>
        </div>
        <h1>Scores</h1>
        <div className="scores">
          <table>
            <tbody>
              <tr>
                <td className="left">Subject 1:</td>
                <td className="right">50/88</td>
              </tr>
              <tr>
                <td className="left">Subject 2:</td>
                <td className="right">50/88</td>
              </tr>
              <tr>
                <td className="left">Subject 3:</td>
                <td className="right">50/88</td>
              </tr>
              <tr>
                <td className="left">Subject 4:</td>
                <td className="right">50/88</td>
              </tr>
              <tr className="total">
                <td className="left">Total score:</td>
                <td className="right">50/888</td>
              </tr>
            </tbody>

          </table>
        </div>

        <SignOutButton />
      </main>
    );
  }
}

function mapStateToProps(state) {
  const isSignedIn = state.auth.getIn(['user', 'isSignedIn']);

  if (isSignedIn) {
    const name = state.auth.getIn(['user', 'attributes', 'name']);
    const email = state.auth.getIn(['user', 'attributes', 'email']);
    const provider = state.auth.getIn(['user', 'attributes', 'provider']);

    let image = null;

    if(state.profile.user && state.profile.user.avatar_url)
      image = state.profile.user.avatar_url;
    else
      image = state.auth.getIn(['user', 'attributes', 'image']);

    return { isSignedIn, name, email, image, provider };
  } else
    return { isSignedIn };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUser: (file) => {
      dispatch(userUpdateRequest(file))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
