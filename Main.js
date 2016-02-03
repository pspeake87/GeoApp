'use strict';

var React = require('react-native');
var Battler = require('./Battler');
var Radar = require('./Radar');
var Menu = require('./Menu');
var GameEngine = require('./GameEngine');
var Experience = require('./Experience');
var OpenScreen = require('./OpenScreen');

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
    openScreen: OpenScreen
};

var Main = React.createClass({



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
        configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}/>
      
      )
  } 

  


});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

module.exports = Main;