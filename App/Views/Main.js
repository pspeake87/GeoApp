'use strict';

const React = require('react-native');
const Battler = require('./Battler');
const Glossary = require('./Glossary');
const Radar = require('./Radar');
const Menu = require('./Menu');
const GameEngine = require('./GameEngine');
const Experience = require('./Experience');
const OpenScreen = require('./OpenScreen');
const Firebase = require('firebase');
const Monsters = require('../Data/Monsters');
const cssVar = require('../Lib/cssVar');

const {
  Component,
  AppRegistry,
  StyleSheet,
  Navigator
  } = React;

const ROUTES = {
  radar: Radar,
  battler: Battler,
  menu: Menu,
  experience: Experience,
  openScreen: OpenScreen,
  glossary: Glossary,
};


module.exports = class Main extends Component {


  componentDidMount() {

    var myFirebaseRef = new Firebase("https://geomonsterapp.firebaseio.com/");
    myFirebaseRef.set({
      player: Monsters.player
    });
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator}/>;
  }

  render() {
    return (
      <Navigator
        style={cssVar('flex')}
        initialRoute={{name: 'openScreen', index: 0}}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}/>

    )
  }

};


