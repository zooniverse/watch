import apiClient from 'panoptes/lib/api-client';

const SET_PROJECT = 'watch/projects/SET_PROJECT'

const initialState = {
  projects: {}
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        projects: Object.assign({}, state.projects, { [action.project.id]: action.project })
      };
    default:
      return state;
  }
}

const fetchProject = (projectID) => {
  return (dispatch) => {
    apiClient.type('projects').get(projectID, { include: ['avatar'] })
      .then((project) => {
        // Getting included avatar resource out of the apiClient cache.
        // This is not actually making another request
        apiClient.type('avatars').get(project.links.avatar.id)
          .then((avatar) => {
            project.avatar_src = avatar.src;
          })
        return project;
      }).then((project) => {
        dispatch(setProject(project));
    }).catch((e) => { console.error(e); })
  }
}

const setProject = (project) => {
  return (dispatch) => {
    type: SET_PROJECT,
    project
  }
}

export default projectsReducer;

export {
  fetchProject
}