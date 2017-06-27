import React from 'react';
import { connect } from 'react-redux';
import { fetchProject, PROJECT_STATUS as status } from '../ducks/projects';

class HeimdallContainer extends React.Component {
  constructor(props) {
    super(props);

    this.listenToClassifications = this.listenToClassifications.bind(this);
    this.processPanoptesClassification = this.processPanoptesClassification.bind(this);
    this.renderProject = this.renderProject.bind(this);
  }

  componentDidMount() {
    if (this.props.subscription) this.listenToClassifications(this.props.subscription);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.subscription !== nextProps.subscription) this.listenToClassifications(nextProps.subscription);
  }

  listenToClassifications(subscription) {
    subscription.bind('classification', this.processPanoptesClassification);
  }

  processPanoptesClassification(classification) {
    const projectsData = this.props.projects.data;
    if (projectsData && projectsData[classification.project_id]) {
      // TODO: Write redux action to increment classification count in state
      // projects[classification.project_id].classifications_count += 1;
      // this.setState({ projects });
      return;
    } else {
      this.props.dispatch(fetchProject(classification.project_id));
     }
   }

  renderProject(projectId) {
    const project = this.props.projects.data[projectId];
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

  render() {
    const { projects } = this.props;

    return (
      <div className="heimdall-container">
        {((projects && projects.status && projects.status.type === status.IDLE) ||
        (projects && projects.status && projects.status.type === status.FETCHING)) &&
          <p>Listening to stream...</p>}
        <ul id="project_list" className="rig columns-6">
          {projects.data &&
            Object.keys(projects.data).map(this.renderProject)}
        </ul>
      </div>
    );
  }
}

HeimdallContainer.defaultProps = {
  projects: {
    data: null,
    status: {
      message: null,
      type: status.IDLE
    }
  }
};

const mapStateToProps = (state) => ({
  subscription: state.subscription,
  projects: state.projects
});

export default connect(mapStateToProps)(HeimdallContainer);
