import React from 'react';
import Pusher from 'pusher-js';
import Panoptes from 'panoptes-client';
import L from 'leaflet-realtime';

export default class Map extends React.Component {
  componentDidMount() {
    var pusher = new Pusher('79e8e05ea522377ba6db', {encrypted: true});
    var channel = pusher.subscribe('panoptes')

    var panoptes = new Panoptes({appID: '1'});

    window.pusher = pusher;
    window.panoptes = panoptes;

    var map = L.map('map')

    this.setState({pusher: pusher, panoptes: panoptes});


  }

  render() {
    return (
      <div id="map">
        here will be the map!
      </div>
    );
  }
};
