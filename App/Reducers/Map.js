import ActionTypes from '../ActionTypes';
import {Dimensions} from 'react-native'
var {width} = Dimensions.get('window');

const initialState = {
    path_line: null,
};

function newLineCalc(region) {
    var lat = region.latitude * (Math.PI / 180)
    var d = region.longitudeDelta * 40075160 * Math.cos(lat) / 360
    var perPixel = d / width;
    var display = 20 / perPixel;
  return display
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.PATH_LINE_UPDATING:
      return Object.assign({}, state, {
        ...map =  {
          ...state,
          path_line: newLineCalc(action.state)
        }
      });

    // ...other actions

    default:
      return state;
  }
}