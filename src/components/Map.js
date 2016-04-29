import React from 'react';
import ReactDOM from 'react-dom'
import Pusher from 'pusher-js';
import L from 'leaflet';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import { apiClient } from 'panoptes-client'

export default class MapVisualization extends React.Component {
  constructor() {
    super();
    this.state = {
      coordinates: [50.5, 30.5],
      project: null,
      zoom: 2,
    };
  }

  processPanoptesClassification (classification) {
    console.log('classification', classification)
    apiClient.type('projects').get(classification.project_id.toString())
      .then((project) => {
        this.setState({
          coordinates: [classification.geo.latitude, classification.geo.longitude],
          project: project
        });
      })
      .catch(() => {
        // Staging server won't find production project ids
        this.setState({ coordinates: [classification.geo.latitude, classification.geo.longitude] });
      });

  }

  componentDidMount() {
    this.props.channel.bind('classification', this.processPanoptesClassification.bind(this));
  }

  render() {
    let position = this.state.coordinates;
    let icon = L.Icon({ iconUrl: 'circle.svg' });
    let popup;
    if (this.state.project !== null) {
      popup =
        <Popup>
          <span>{this.state.project.display_name}</span>
          <span>{this.state.coordinates[0]}, {this.state.coordinates[1]}</span>
        </Popup>;
      return popup
    };

    return (
      <Map ref="map" className="map" center={[0, 0]} zoom={this.state.zoom}>
        <TileLayer
          url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
        <CircleMarker className="circle-marker" center={position} radius={3}>
          {popup}
        </CircleMarker>
      </Map>
    )
  }
};

