import ActionTypes from '../ActionTypes';

const initialState = {

};

export default function farmSprayer(state = initialState, action) {
  
  switch (action.type) {
    case ActionTypes.ANNOUNCEMENTS:
      return actionStates(state, "announcements", action);
    case ActionTypes.BIBLE_READINGS:
      return actionStates(state, "bible_readings_by_date", action);
      // return Object.assign({}, state, {
      //   bible_readings_by_date: {
      //     ...state,
      //     ...action.bible_readings_by_date
      //   }
      // });
    case ActionTypes.CATEGORIES:
      return actionStates(state, "categories", action);
    case ActionTypes.CALENDAR:
      return actionStates(state, "calendar_events", action);
    case ActionTypes.RESOURCES:
      return actionStates(state, "resources", action);
    case ActionTypes.PRAYERS:
      return actionStates(state, "prayers_and_confessions", action);
    case ActionTypes.MEDIA_ARCHIVES:
      return actionStates(state, "media_archives", action);
    case ActionTypes.LIVE_STREAM_INFO:
      return actionStates(state, "live_stream_info", action);
    case ActionTypes.MEDIA_TOPICS:
      return actionStates(state,"media_topics", action);
    default:
      return state
  }
};