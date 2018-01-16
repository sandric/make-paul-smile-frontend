import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OAuthButton from './OAuthButton';

class Authorize extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    // return (
    //   <div>
    //     <a href="">Sign In</a>
    //     <OAuthButton provider='github' />
    //   </div>      
    // );

    return (
      <div>
        <a href="">Sign Up</a>
        <OAuthButton provider='github' />
      </div>      
    );
  }
}

export default Authorize;
