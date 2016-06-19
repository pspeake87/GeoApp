import ActionTypes from '../ActionTypes';

const initialState = {
    firebase_instance: null,
    firebase_secret: null,
    oauth: {
      client_id: null,
      client_secret: null,
      scope: null,
    },
    api_base_url: null,
    web_base_url: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionTypes.ENVIRONMENT_INITIALIZED:
      return {
        ...state,
        ...action.data,
      };

    // ...other actions

    default:
      return state;
  }
}