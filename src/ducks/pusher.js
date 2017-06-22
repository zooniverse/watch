import Pusher from 'pusher-js';

const SET_PUSHER_SUBSCRIPTION = 'watch/pusher/SET_PUSHER_SUBSCRIPTION'

const initialState = {
  subscription: null
}

const pusherReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PUSHER_SUBSCRIPTION:
      return {
        subscription: action.subscription
      }
    default:
      return state;
  }
}

const setSubscription = (subscription) => {
  return (dispatch) => {
    dispatch({
      type: SET_PUSHER_SUBSCRIPTION,
      subscription
    })
  }
}

const initializePusher = () => {
  const connection = new Pusher('79e8e05ea522377ba6db', {encrypted: true});
  const subscription = connection.subscribe('panoptes');

  setSubscribe(subscription);
}

export default pusherReducer;

export {
  initializePusher
}