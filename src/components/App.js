import React from 'react';
import { Link }  from 'react-router';
import packageJSON from '../../package.json';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      channel: null
    };
  }

  componentWillMount() {
    const pusher = new Pusher('79e8e05ea522377ba6db', {encrypted: true});
    const channel = pusher.subscribe('panoptes')

    this.setState({ channel })
  }

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
          {React.cloneElement(this.props.children, { channel: this.state.channel })|| 'Welcome to React Starterify'}
        </section>
      </div>
    )
  }
};
