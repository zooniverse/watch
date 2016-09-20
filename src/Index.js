import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Heimdall from './components/Heimdall';
import Map from './components/Map';

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/heimdall" component={Heimdall} />
      <Route path="/map" component={Map} />
    </Route>
  </Router>
  , document.getElementById('content')
);
