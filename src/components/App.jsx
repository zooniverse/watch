import React from 'react';
import { Link }  from 'react-router';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      channel: null
    };
  }

  componentDidMount() {
    const pusher = new Pusher('79e8e05ea522377ba6db', {encrypted: true});
    const channel = pusher.subscribe('panoptes')

    this.setState({ channel: channel })
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/"><h1>Zooniverse Status</h1></Link>
          <Link to="/heimdall">Heimdall</Link>
          <Link to="/map">Map</Link>
        </header>
        <section>
          {(this.state.channel) ? React.cloneElement(this.props.children, { channel: this.state.channel }) : "Loading..." }
        </section>
      </div>
    )
  }
};
