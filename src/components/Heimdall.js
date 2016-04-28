import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Pusher from 'pusher-js';
import Panoptes from 'panoptes-client';


export default class Heimdall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {projects: {}};
  }

  processPanoptesClassification(classification) {
    if (this.state.projects[classification.project_id]) {
      this.state.projects[classification.project_id].classifications_count += 1;
      this.forceUpdate();
    } else {
      this.state.panoptes.api.type('projects').get(classification.project_id.toString()).then(function(project) {
        project.avatarSrc = 'https://placekitten.com/175/175';
        this.loadAvatar(project)
        var projects = this.state.projects;
        projects[classification.project_id] = project;
        this.setState({projects: projects});
      }.bind(this));
    }
  }

  loadAvatar(project) {
    project.get("avatar").then(function(avatar) {
      project.avatarSrc = avatar.src;
      var projects = this.state.projects;
      projects[project.id] = project;
      this.setState({projects: projects})
    }.bind(this));
  }

  componentDidMount() {
    var pusher = new Pusher('79e8e05ea522377ba6db', {encrypted: true});
    var channel = pusher.subscribe('panoptes')
    channel.bind('classification', this.processPanoptesClassification.bind(this))

    var panoptes = new Panoptes({appID: '1'});

    window.pusher = pusher;
    window.panoptes = panoptes;

    this.setState({pusher: pusher, panoptes: panoptes});
  }

  render() {
    return (
      <div>
        <ul id="project_list" className="rig columns-6">
          <ReactCSSTransitionGroup transitionName="twiddle" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {Object.keys(this.state.projects).map(this.renderProject.bind(this))}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }

  renderProject(projectId) {
    var project = this.state.projects[projectId];
    var key = project.id + "-" + project.classifications_count;
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
