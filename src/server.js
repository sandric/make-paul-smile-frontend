import express  from 'express';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon'
import path from 'path'
import React    from 'react';
import { renderToString } from 'react-dom/server';
import { getHeaders, initialize } from 'redux-oauth';
import { StaticRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

import routes from './routes';

const app = express();

app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

app.use(express.static('public'));


app.get("*", (req, res) => {
  const store = configureStore();

  return store.dispatch(initialize({
    backend: {
      apiUrl: 'http://localhost:4000',
      authProviderPaths: {
        github: '/auth/github',
        facebook: '/auth/facebook'
      },
      signOutPath: null
    },
    cookies: req.cookies,
    currentLocation: req.url
  })).then(() => {

    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({route}) => {
      let fetchData = route.component.fetchData;
      return fetchData instanceof Function ? fetchData(store.dispatch) : Promise.resolve(null)
    });
    return Promise.all(promises).then((data) => {
      let context = {};
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes, {prefetchedData: "data"})}
          </StaticRouter>
        </Provider>
      );

      res.cookie('authHeaders',
                 JSON.stringify(getHeaders(store.getState())),
                 { maxAge: Date.now() + 14 * 24 * 3600 * 1000 });
      return res.end(renderHTML(content, store.getState()));
    });
  });
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

function renderHTML(componentHTML, initialState) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link href='http://fonts.googleapis.com/css?family=Arizonia' rel='stylesheet' type='text/css'>
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css?family=Rochester" rel="stylesheet">
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
          <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
          </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
      	<div id="dev-tools"></div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
