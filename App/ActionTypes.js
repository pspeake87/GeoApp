/**
 *
 * NOTE:
 * Per http://redux.js.org/docs/advanced/AsyncActions.html
 * for each type of data we receive from the server, we have 3 action types to
 * represent the asynchronous process of retrieving the data.  The action types
 * indicate that the fetch started (1), and that it succeeded (2) or failed (3).
 *
 * For the type "announcements", for example, we have:
 * FETCH_ANNOUNCEMENTS_REQUEST
 * FETCH_ANNOUNCEMENTS_SUCCESS
 * FETCH_ANNOUNCEMENTS_FAILURE
 *
 */
import keyMirror from 'keymirror';
import _ from 'underscore';

// let baseActionTypes = [
//   'ANNOUNCEMENTS',
//   'GROUPS',
//   'RESOURCES',
//   'INDIVIDUAL_RESOURCE',
//   'PRAYERS',
//   'INDIVIDUAL_PRAYER',
//   'MEDIA_ARCHIVES',
//   'INDIVIDUAL_MEDIA_ARCHIVE',
//   'CALENDAR_EVENTS',
//   'CATEGORIES',
//   'MEDIA_TOPICS',
//   'LIVE_STREAM_INFO',
//   'BIBLE_READINGS',
// ];
//
// let requestStates = ['FETCH_REQUEST', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'INVALIDATE'];
//
// /**
//  * Loops through the base action types and creates the 3 distinct action types
//  * that represent the various request states in the async api workflow
//  */
// function createAsyncActionTypes() {
//   var newTypes = {};
//   _.each(baseActionTypes, (base_type) => {
//     _.each(requestStates, (request_state) => {
//       let type = base_type + '_' + request_state;
//       newTypes[type] = type;
//     });
//   });
//
//   return newTypes;
// }


export default keyMirror({
  ITEMS_LOADED: null,
  MOVES_LOADED: null,
  MONSTERS_LOADED: null,

  // -----------
  ACCESS_TOKEN: null,
  LOGOUT: null,
  ENVIRONMENT_INITIALIZED: null,
});
