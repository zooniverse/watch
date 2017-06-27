import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { ZooniverseLogo } from 'zooniverse-react-components';

import AboutLayout from './about';
import Home from './Home';
import Heimdall from '../containers/HeimdallContainer';

export default function AppLayout() {
  return (
    <div>
      <header className="site-header">
        <Link to="/" className="link"><h1 className="title">Zooniverse Starter Project</h1></Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/heimdall" className="link">Heimdall</Link>
        <ZooniverseLogo />
      </header>
      <section className="content-section">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={AboutLayout} />
          <Route path="/heimdall" component={Heimdall} />
        </Switch>
      </section>
    </div>
  );
}

