

'use strict';

const React = require('react-native');
const Main = require('./App/Views/Main');
const Battler = require('./App/Views/Battler');
const Dispatcher = require('./App/Dispatcher');
const Constants = require('./App/Constants');

const {
  AppRegistry,
  StyleSheet,
  View,
} = React;

const cssVar = require('./App/Lib/cssVar');


const GeoApp = React.createClass({

  componentDidMount() {

    var _items = require('./App/Data/Items.js');

    Dispatcher.dispatch({
      actionType: Constants.ActionTypes.ITEMS_LOADED,
      _items: _items

    });
  },


  render() {
   return (
      <View style={cssVar('flex')}>
          <Main />    
      </View>
    )
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



AppRegistry.registerComponent('GeoApp', () => GeoApp);
