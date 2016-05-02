import React from 'react';
import ReactDOM from 'react-dom'
import Pusher from 'pusher-js';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import { apiClient } from 'panoptes-client'

export default class MapVisualization extends React.Component {
  constructor() {
    super();
    this.state = {
      coordinates: [50.5, 30.5],
      project: null,
    };
  }

  processPanoptesClassification (classification) {
    apiClient.type('projects').get(classification.project_id.toString())
      .then((project) => {
        // Eventually we'll show some cool info about projects
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

    return (
      <Map ref="map" className="map" center={[0, 0]} zoom={2} zoomControl={false}>
        <TileLayer
          url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
        <CircleMarker className="circle-marker" center={position} radius={3}>
          <Popup>
            <span>{this.state.coordinates[0]}, {this.state.coordinates[1]}</span>
          </Popup>
        </CircleMarker>
      </Map>
    )
  }
};

