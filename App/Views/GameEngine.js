'use strict';

const React = require('react-native');
const Monsters = require('../Data/Monsters');
const cssVar = require('../Lib/cssVar');

const {
  Component,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,

  } = React;


module.exports = class GameEngine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(this.props.player.currentHp),
      fadeLost: new Animated.Value(this.props.player.maxHp - this.props.player.currentHp)
    }

  }

  componentDidUpdate() {
    Animated.spring(
      this.state.fadeAnim,
      {
        toValue: this.props.player.currentHp,
        tension: 0,
        velocity: 3,

      },
    ).start();
    Animated.spring(
      this.state.fadeLost,
      {
        toValue: (this.props.player.maxHp - this.props.player.currentHp),
        tension: 0,
        velocity: 3,

      },
    ).start();

  }


  render() {

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Animated.View
          style={{flex: this.state.fadeAnim, backgroundColor: 'rgba(0,255,0,1)', borderWidth: 1, borderRadius: 5, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0,height: 15}}>
        </Animated.View>
        <Animated.View
          style={{flex: this.state.fadeLost, backgroundColor: 'rgba(0,0,0,0)', borderWidth: 1, height: 15, borderRadius: 5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginRight: 5}}>
        </Animated.View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

