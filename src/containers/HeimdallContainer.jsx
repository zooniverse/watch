import React from 'react';
import {fetchProject} from '../ducks/projects'

class HeimdallContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.subscription.bind('classification', this.processPanoptesClassification)
  }

  processPanoptesClassification(classification) {
    if (this.props.projects[classification.project_id]) {
       // TODO: Write redux action to increment classification count in state
       // projects[classification.project_id].classifications_count += 1;
       // this.setState({ projects });
    } else {
      fetchProject(classification.project_id);
     }
   }

}

const mapStateToProps = (state) => ({
  subscription: state.subscription,
  projects: state.projects
})

export default connect(mapStateToProps)(HeimdallContainer)