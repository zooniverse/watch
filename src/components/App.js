import React from 'react';
import { Link }  from 'react-router';
import packageJSON from '../../package.json';

export default React.createClass({
  returnSomething(something) {
    //this is only for testing purposes. Check /test/components/App-test.js
    return something;
  },
  render() {
    const version = packageJSON.version;

    return (
      <div>
        <header>
          <h1>Zooniverse Status</h1>
          <Link to="/heimdall">Heimdall</Link>
          <Link to="/map">Live</Link>
        </header>
        <section>
          {this.props.children || 'Welcome to React Starterify'}
        </section>
      </div>
    )
  }
});
