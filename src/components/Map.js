import React from 'react';
import ReactDOM from 'react-dom'
import Pusher from 'pusher-js';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import { apiClient } from 'panoptes-client'

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      coordinates: [50.5, 30.5],
      project: null,
      zoom: 1,
    };
  }

  processPanoptesClassification (classification) {
    console.log('classification', classification)
    apiClient.type('projects').get(classification.project_id.toString())
      .then( (project) => {
        this.setState({
          coordinates: [classification.geo.latitude, classification.geo.longitude],
          project: project
        });
      })
      .catch( () => {
        console.log(this);
        // Staging server won't find production project ids
        this.setState({ coordinates: [classification.geo.latitude, classification.geo.longitude] });
      });

  }

  componentDidMount() {
    this.props.channel.bind('classification', this.processPanoptesClassification.bind(this));
  }

  render() {
    let position = this.state.coordinates;
    let marker;
    if (this.state.project !== null) {
      return marker =
        <Popup>
          <span>{this.state.project.display_name}</span>
        </Popup>
    } else {
      return null
    };

    return (
      <LeafletMap ref="map" className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          {marker}
        </Marker>
      </LeafletMap>
    )
  }
};

