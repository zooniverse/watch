import React from 'react';
import ReactDOM from 'react-dom'
import Pusher from 'pusher-js';
import Panoptes from 'panoptes-client';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      coordinates: [50.5, 30.5],
      zoom: 1,
    };
  }

  processPanoptesClassification (classification) {
    console.log('classification', classification)
    this.setState({coordinates: [classification.geo.latitude, classification.geo.longitude]});
  }

  componentDidMount() {
    const pusher = new Pusher('79e8e05ea522377ba6db', {encrypted: true});
    const channel = pusher.subscribe('panoptes');
    const panoptes = new Panoptes({appID: '1'});
    channel.bind('classification', this.processPanoptesClassification.bind(this));

    window.pusher = pusher;
    window.panoptes = panoptes;

    this.setState({pusher, panoptes});
  }

  render() {
    const position = this.state.coordinates;
    return (
      <LeafletMap ref="map" className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      </LeafletMap>
    )
  }
};

