import Pusher from 'pusher-js';

const SET_PUSHER_SUBSCRIPTION = 'watch/pusher/SET_PUSHER_SUBSCRIPTION';

const initialState = {
  subscription: null
};

export default function pusherReducer(state = initialState, action) {
  switch(action.type) {
    case SET_PUSHER_SUBSCRIPTION:
      return (action.subscription);
    default:
      return state;
  }
}

export function setSubscription(subscription) {
  return { type: SET_PUSHER_SUBSCRIPTION, subscription };
}

export function initializePusher() {
  return (dispatch) => {
    const connection = new Pusher('79e8e05ea522377ba6db', { encrypted: true });
    const subscription = connection.subscribe('panoptes');

    dispatch(setSubscription(subscription));
  };
}

