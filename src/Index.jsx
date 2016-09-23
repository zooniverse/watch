import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import App from './components/App';
import Home from './components/Home';
import Heimdall from './components/Heimdall';
import Map from './components/Map';

import Styles from './styles/main.styl';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
  <Router history={appHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/heimdall" component={Heimdall} />
      <Route path="/map" component={Map} />
    </Route>
  </Router>
  , document.getElementById('content')
);
