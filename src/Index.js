import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import Heimdall from './components/Heimdall';
import Map from './components/Map';

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/heimdall" component={Heimdall}/>
      <Route path="/map" component={Map}/>
    </Route>
  </Router>
  , document.getElementById('content')
);
