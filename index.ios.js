

'use strict';

const React = require('react-native');
const Main = require('./App/Views/Main');
const Battler = require('./App/Views/Battler');
const ActionCreator = require('./App/Actions/ActionCreator');
const Constants = require('./App/Constants');

const {
  AppRegistry,
  StyleSheet,
  View,
} = React;
 
//styles
const cssVar = require('./App/Lib/cssVar');

//stores
const ItemStore = require('./App/Stores/ItemStore');
const MonsterStore = require('./App/Stores/MonsterStore');
const MovesStore = require('./App/Stores/MovesStore');



const GeoApp = React.createClass({

  componentDidMount() {

    var _items = require('./App/Data/Items');
    ActionCreator.itemsLoad(_items);

    var _monsters = require('./App/Data/Monsters');
    ActionCreator.monstersLoad(_monsters);

    var _moves = require('./App/Data/Moves');
    ActionCreator.movesLoad(_moves);

    
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
