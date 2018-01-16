import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isUserSignedIn } from 'redux/models/user';

import { renderRoutes, matchRoutes } from 'react-router-config'

import './App.css'

const propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  children: PropTypes.node
};

class App extends Component {
  routes() {
    if(this.props.route) {
      return renderRoutes(this.props.route.routes)
    } else
      return null
  }

  componentWillReceiveProps(nextProps) {
    const navigated = nextProps.location !== this.props.location
    const { routes } = this.props.route
    if (navigated) {
      const prefetchingRequests = matchRoutes(routes, window.location.pathname)
            .map(({ route, match }) => {
              return route.component.fetchData
                ? route.component.fetchData(this.props.dispatch)
                : Promise.resolve(null)
            })
      Promise.all(prefetchingRequests)
        .then((prefetchedData) => {
          console.log('Data prefetched')
        })
    }
  }

  profile() {
    const style = {
      backgroundImage: `url(${this.props.profileImage || "avatar.png"})`,
      backgroundSize: "cover"
    }

    return (
      <Link to='/profile'>
        <div className="avatar" style={style}></div>
        <span>Profile</span>
      </Link>
    )
  }

  signIn() {
    return (
      <Link to='/profile'>
        <span>Sign In</span>
      </Link>
    )
  }

  authorize() {
    if(this.props.isSignedIn)
      return this.profile()
    else
      return this.signIn()
  }
  
  render() {
    return (
      <div>
        <header>
          <nav>
            <div className="left">
              {this.props.isSignedIn &&
                <Link to='/subjects'>Game</Link>}
            </div>
            <div className="right">
              {this.authorize()}
            </div>
          </nav>
        </header>
        {this.routes()}
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const isSignedIn = state.auth.getIn(['user', 'isSignedIn']);

  if(isSignedIn) {
    const profileImage = state.auth.getIn(['user', 'attributes', 'image']);
    return { isSignedIn, profileImage };
  } else
    return { isSignedIn };
}

export default connect(mapStateToProps)(App);
