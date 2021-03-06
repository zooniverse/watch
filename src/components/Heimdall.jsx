import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Pusher from 'pusher-js';
import apiClient from 'panoptes-client/lib/api-client';

export default class Heimdall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {projects: {}};

    this.processPanoptesClassification = this.processPanoptesClassification.bind(this);
    this.loadAvatar = this.loadAvatar.bind(this);
  }

  processPanoptesClassification(classification) {
    if (this.state.projects[classification.project_id]) {
      let projects = this.state.projects;
      projects[classification.project_id].classifications_count += 1;
      this.setState({ projects });
    } else {
      apiClient.type('projects').get(classification.project_id.toString())
        .then((project) => {
          project.avatarSrc = 'https://placekitten.com/175/175';
          this.loadAvatar(project);
          let projects = this.state.projects;
          projects[classification.project_id] = project;
          this.setState({ projects });
        });
    }
  }

  loadAvatar(project) {
    project.get('avatar').then((avatar) => {
      project.avatarSrc = avatar.src;
      let projects = this.state.projects;
      projects[project.id] = project;
      this.setState({ projects });
    });
  }

  componentDidMount() {
    this.props.channel.bind('classification', this.processPanoptesClassification)
  }

  render() {
    return (
      <div className="heimdall-container">
        <p>Listening to stream...</p>
        <ul id="project_list" className="rig columns-6">
          <ReactCSSTransitionGroup transitionName="twiddle" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {Object.keys(this.state.projects).map(this.renderProject.bind(this))}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }

  renderProject(projectId) {
    const project = this.state.projects[projectId];
    const key = project.id + '-' + project.classifications_count;
    return (
      <li key={key}>
        <div id={project.id} className="project-box" title={project.display_name}>
          <a href="https://api.zooniverse.org/projects/{project.id}/status" target="_blank">
            <img src={project.avatarSrc} alt={project.display_name} />
          </a>
          <span className="counts">
            <span title="Classifications" className="left">{project.classifications_count}</span>
            <span title="Registered Users" className="right">{project.classifiers_count}</span>
          </span>
        </div>
      </li>
    );
  }
};
