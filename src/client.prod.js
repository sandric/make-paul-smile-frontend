import React      from 'react';
import ReactDOM   from 'react-dom';
import { BrowserRouter } from 'react-router';
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './redux/configureStore';

import DevTools from './components/DevTools/DevTools';

const initialState = window.REDUX_INITIAL_STATE || {};

const store = configureStore(initialState);

const component = (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes())}
    </BrowserRouter>
  </Provider>
);

ReactDOM.hydrate(component, document.getElementById('react-view'));
ReactDOM.hydrate(<DevTools store={store} />, document.getElementById('dev-tools'));

