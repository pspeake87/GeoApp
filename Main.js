'use strict';

var React = require('react-native');
var Battler = require('./Battler');
var Glossary = require('./Glossary');
var Radar = require('./Radar');
var Menu = require('./Menu');
var GameEngine = require('./GameEngine');
var Experience = require('./Experience');
var OpenScreen = require('./OpenScreen');
var Firebase = require('firebase');
var Monsters = require('./Data/Monsters');

var {
  AppRegistry,
  StyleSheet,
  Navigator
} = React;

var ROUTES = {
    radar: Radar,
    battler: Battler,
    menu: Menu,
    experience: Experience,
    openScreen: OpenScreen,
    glossary: Glossary,
};

var Main = React.createClass({


componentDidMount() {

        var myFirebaseRef = new Firebase("https://geomonsterapp.firebaseio.com/");
         myFirebaseRef.set({
           player: Monsters.player
        });
},

  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },

  render: function(){
    
      return (
        <Navigator 
        style={styles.container}
        initialRoute={{name: 'battler', index: 0}}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}/>
        
      )
  } 

  


});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

module.exports = Main;