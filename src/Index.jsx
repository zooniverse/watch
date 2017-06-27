import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import AppContainer from './containers/AppContainer';
import configureStore from './store';

import './styles/main.styl';

const store = configureStore();
const history = createHistory();


ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer} />
    </Router>
  </Provider>),
  document.getElementById('root'),
);
