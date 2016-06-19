import React, {Component} from 'react';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import {Router, Switch, Scene, Actions, DefaultRenderer} from 'react-native-router-flux';
import createLogger from 'redux-logger';
import * as ActionCreators from './ActionCreators';
import OAuth2 from 'react-native-oauth2';
import persistentStorage from 'react-native-simple-store';
import moment from 'moment';

import Radar from './Views/Radar.js';
import Battler from './Views/Battler.js';
// import Menu from './Views/Menu.js';



//styles
import cssVar from './Lib/cssVar';

const RouterWithRedux = connect()(Router);

// Per the redux documentation, we have a reducer
// that updates state based on all the actions that
// our app uses
// http://redux.js.org/docs/basics/Reducers.html
import reducers from './Reducers';

// Per the redux documentation, we have a single store
// that manages all app state
// http://redux.js.org/docs/basics/Store.html
const loggerMiddelware = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, loggerMiddelware));




class App extends Component {


  constructor(props) {
  super(props);

  this.state = {
        authenticating: false,
        valid_session: false,
        user_id: null,
    };
  }

  componentDidMount() {

//     OAuth2.onValidToken((token) => {
//       store.dispatch(ActionCreators.accessTokenSuccess(token));
//     });

//     OAuth2.onNoValidToken(() => {
//       store.dispatch(ActionCreators.accessTokenFailure());
//     });

    // Set up OAuth2
//     OAuth2.initializeConfig('dd469d453a2067129568b85fa83769e8', '7575682d2cc6c2b9034e4b9f31c43558', 'http://dev.familycc.org/oauth2/access_token');
//     OAuth2.setEncodingType('form_data');

    // Check to see if we already have a token stored on
    // the device.
//     persistentStorage.get('oauth_token').then((token) => {
//       let has_token = (token && token.access_token);
//       if (has_token) {
//         store.dispatch(ActionCreators.accessTokenFetching());
//         OAuth2.initializeSession(token);
//       } else {
//         store.dispatch(ActionCreators.accessTokenNotPresent());
//       }
//     });

  }

  selectRouterTab(props) {

      return "main"

  }


  render() {
   let ConnectedSwitch = connect(state=>({session: state.session}))(Switch);
  return (

    <Provider store={store}>
      <RouterWithRedux>
       <Scene key="root"
               component={ConnectedSwitch}
               tabs={true}
               selector={this.selectRouterTab.bind(this)}>


        <Scene key="main" tabs={true}>
          <Scene key="radar" initial={true} hideNavBar={true} component={Radar}/>
          <Scene key="battler" hideNavBar={true} component={Battler}/>
        </Scene>


        </Scene>
      </RouterWithRedux>
    </Provider>
  )
}
}

export default App;
