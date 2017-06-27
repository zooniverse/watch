import { combineReducers } from 'redux';
import subscription from './pusher';
import projects from './projects';

export default combineReducers({
  projects,
  subscription
});
