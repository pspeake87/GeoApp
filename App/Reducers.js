import {combineReducers} from 'redux';
import routes from './Reducers/Routes';
import map from './Reducers/Map';
import api_data from './Reducers/APIData';
import session from './Reducers/Session';
import environment from './Reducers/Environment';

export default combineReducers({
  map,
  routes,
  api_data,
  session,
  environment
});
