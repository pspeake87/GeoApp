import ActionTypes from './ActionTypes';
import OAuth2 from 'react-native-oauth2';
import persistentStorage from 'react-native-simple-store';

let INVALIDATE = 'INVALIDATE';
let API_REQUEST = 'API_REQUEST';
let API_SUCCESS = 'API_SUCCESS';
let API_FAILURE = 'API_FAILURE';



export function invalidateAction(actionType) {
  return {type: actionType, state: INVALIDATE};
}

export function apiRequestAction(actionType) {
  return {type: actionType, state: API_REQUEST};
}

export function apiSuccessAction(actionType, data) {
  return {type: actionType, state: API_SUCCESS, payload: data};
}

export function apiFailureAction(actionType, error:String) {
  return {type: actionType, state: API_FAILURE, error: error};
}

/**
 * This is a DRY function designed to be invoked by the other action creators
 * that manage making async API calls and dispatching actions in the async
 * workflow
 *
 * @param actionType - This should be a constant defined in ActionTypes
 * @param apiEndpoint - This is the name of the API endpoint (not including the base endpoint shared by all API methods)
 * @param params - This is the payload sent to the API with the request
 * @param requestMethod - The HTTP verb used to fetch the data (defaults to GET)
 *
 */
function _fetchTemplate(actionType, apiEndpoint, params:Object = null, requestMethod:String = 'GET') {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(apiRequestAction(actionType));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    var promise;
    switch (requestMethod.toUpperCase()) {
      case 'POST':
        promise = APIHelper.authenticatedPost(apiEndpoint);
        break;
      case 'DELETE':
        promise = APIHelper.authenticatedDelete(apiEndpoint);
        break;
      default:
        promise = APIHelper.authenticatedGet(apiEndpoint);
        break;
    }

    return promise.then((data) => {
      // We were successful, so dispatch the appropriate success action with data in the payload
      dispatch(apiSuccessAction(actionType, data));

    }, (error) => {
      // We were unsuccessful, so dispatch the appropriate failure action with the error in the payload
      dispatch(apiFailureAction(actionType, error));

    });

  }
}

export function updatingPathLine(region) {
  return {type: ActionTypes.PATH_LINE_UPDATING, state: region};
}

export function accessTokenFetching() {
  return {type: ActionTypes.ACCESS_TOKEN, state: API_REQUEST};
}

export function accessTokenNotPresent() {
  return {type: ActionTypes.ACCESS_TOKEN, state: 'NOT_PRESENT'};
}

export function accessTokenSuccess(token) {
  return {type: ActionTypes.ACCESS_TOKEN, state: API_SUCCESS, payload: token};
}

export function accessTokenFailure(error) {
  return {type: ActionTypes.ACCESS_TOKEN, state: API_FAILURE, error: error};
}

export function logout() {
  return {type: ActionTypes.LOGOUT};
}


export function login (email, password) {

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(accessTokenFetching());

    return OAuth2.authenticate(email, password).then((token) => {

      persistentStorage.save('oauth_token', token);

      // We were successful, so dispatch the appropriate success action with data in the payload
      dispatch(accessTokenSuccess(token));

    }, (error) => {
      // We were unsuccessful, so dispatch the appropriate failure action with the error in the payload
      dispatch(accessTokenFailure());

    });

  };
}
