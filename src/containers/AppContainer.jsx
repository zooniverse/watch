import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { initializePusher } from '../ducks/pusher';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(initializePusher());
  }

  render() {
    return (<AppLayout />);
  }
}

export default connect()(App);
