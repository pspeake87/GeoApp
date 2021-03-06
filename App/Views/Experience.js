'use strict';

const React = require('react-native');
const Monsters = require('../Data/Monsters');
const Items = require('../Data/Items');
const cssVar = require('../Lib/cssVar');

const {
  Component,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Animated,
  Easing,
  Image

  } = React;


module.exports = class Experience extends Component {


  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(Monsters.player.experienceGained),
      fadeLost: new Animated.Value(Monsters.player.experienceTotal - Monsters.player.experienceGained),
      newGainedValue: (Monsters.currentEnemy.experience + Monsters.player.experienceGained),
      newToGoValue: (Monsters.player.experienceTotal) - (Monsters.currentEnemy.experience + Monsters.player.experienceGained),
      item: null,
      leveledUp: null
    }

  }

  componentDidMount() {
    this.itemGenerator();
    setTimeout(() => this.animateExpBar(), 2000);
    setTimeout(() => this.calculateExperience(), 3500);

  }

  animateExpBar() {
    Animated.spring(
      this.state.fadeAnim,
      {
        toValue: this.state.newGainedValue,
        tension: -10,
        velocity: 3,
      },
    ).start();
    Animated.spring(
      this.state.fadeLost,
      {
        toValue: this.state.newToGoValue,
        tension: -10,
        velocity: 3,
      },
    ).start();


  }

  itemGenerator() {
    var randomItem = Math.floor(Math.random() * Items.items.length);
    // determine enemy monster monsterRandomizer(player)
    var randomNumber = Math.random();
    if (randomNumber < Monsters.currentEnemy.itemSpawn) {
      this.setState({item: Items.items[randomItem]});
      if (Items.items[randomItem]) {
        Monsters.player.items.push(Items.items[randomItem]);
      }
    } else {
      this.setState({item: null});
    }
  }


  renderItem() {
    if (this.state.item) {
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          {this.state.item.name} was Aquired
        </Text>
      </View>
    } else {
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Nothing was found
        </Text>
      </View>
    }
  }

  calculateExperience() {
    if (this.state.newGainedValue >= Monsters.player.experienceTotal) {
      Monsters.player.level = Monsters.player.level + 1;
      Monsters.player.experienceGained = this.state.newGainedValue - Monsters.player.experienceTotal
      Monsters.player.experienceTotal = Monsters.player.experienceTotal * 2;
      this.setState({leveledUp: true});
      setTimeout(() => this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[1]), 2000);
    } else {
      Monsters.player.experienceGained = this.state.newGainedValue
      setTimeout(() => this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[1]), 2000);
    }
  }

  renderLevelGained() {

    if (this.state.leveledUp) {

      return <View style={{flex: 7}}>
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2}}>
          <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>
            Level Gained
          </Text>
        </View>
        <View style={{flex: 4, flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Strength {Monsters.player.stats[0]}
            </Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Defense {Monsters.player.stats[1]}
            </Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Agility {Monsters.player.stats[2]}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'flex-start' }}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Evasion {Monsters.player.stats[3]}
            </Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Speed {Monsters.player.stats[4]}
            </Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Resistance {Monsters.player.stats[5]}
            </Text>

          </View>
        </View>
      </View>
    } else {

      return <View style={{flex: 7}}>
      </View>
    }
  }


  render() {

    return (
      <View style={styles.container}>
        <Image style={{flex: 1}}
               source={{uri: 'background2.jpg'}}
               resizeMode={'stretch'}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>
              {Monsters.player.name}
            </Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>
              Lv. {Monsters.player.level}
            </Text>
          </View>

          <View style={{flex: 2}}>

            <View style={{flex: 1, flexDirection: 'row', height: 21, alignItems: 'center'}}>
              <Animated.View
                style={{flex: this.state.fadeAnim, backgroundColor: 'rgba(0,0,255,1)', borderWidth: 1, borderRadius: 5, borderColor: 'white', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0,height: 15, marginLeft: 30}}>
              </Animated.View>
              <Animated.View
                style={{flex: this.state.fadeLost, backgroundColor: 'rgba(0,0,0,0)', borderWidth: 1, height: 15, borderRadius: 5, borderColor: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0, marginRight: 30}}>
              </Animated.View>
              <Animated.Text style={{color: 'white'}}>

              </Animated.Text>
            </View>


          </View>

          {this.renderLevelGained()}
          {this.renderItem()}


        </Image>

      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  }
});

