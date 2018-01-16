import React      from 'react';
import ReactDOM   from 'react-dom';
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './redux/configureStore';

import DevTools from './components/DevTools/DevTools';

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

const root = (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
)


ReactDOM.hydrate(root, document.getElementById('react-view'));
ReactDOM.hydrate(<DevTools store={store} />, document.getElementById('dev-tools'));

