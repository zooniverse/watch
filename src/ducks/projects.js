import apiClient from 'panoptes-client/lib/api-client';

// Constants: Action types
const SET_PROJECT_FETCHING = 'watch/projects/SET_PROJECT_FETCHING';
const SET_PROJECT_SUCCESS = 'watch/projects/SET_PROJECT_SUCCESS';
const SET_PROJECT_ERROR = 'watch/projects/SET_PROJECT_ERROR';

// Misc Constants
export const PROJECT_STATUS = {
  ERROR: 'error',
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success'
};

// Reducer
const initialState = {
  data: null,
  status: {
    message: null,
    type: PROJECT_STATUS.IDLE
  }
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT_FETCHING:
      return (
        Object.assign({}, state, {
          status: {
            message: null,
            type: PROJECT_STATUS.FETCHING
          }
        })
      );
    case SET_PROJECT_SUCCESS:
      return (
        Object.assign({}, state, {
          data: { [action.project.id]: action.project },
          status: {
            message: null,
            type: PROJECT_STATUS.SUCCESS
          }
        })
      );
    case SET_PROJECT_ERROR:
      return (
        Object.assign({}, state, {
          status: {
            message: `${action.error.status}: ${action.error.message}`,
            type: PROJECT_STATUS.ERROR
          }
        })
      );
    default:
      return state;
  }
}

// Action Creators
export function setProjectStatusFetching() {
  return { type: SET_PROJECT_FETCHING };
}

export function setProject(project) {
  return { type: SET_PROJECT_SUCCESS, project };
}

export function setProjectStatusError(error) {
  return { type: SET_PROJECT_ERROR, error };
}

// Async functions
export function fetchProject(projectID) {
  return (dispatch) => {
    dispatch(setProjectStatusFetching());

    return apiClient.type('projects').get(projectID, { cards: true })
      .then((project) => {
        dispatch(setProject(project));
      }).catch((error) => {
      // In this app, we do not care if a project is not found
        if (error.status !== 404) {
          dispatch(setProjectStatusError(error));
          console.error(error);
        }
      });
  };
}
