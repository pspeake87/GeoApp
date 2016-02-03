'use strict';

var React = require('react-native');
var Monsters = require('./Data/Monsters');
var Items = require('./Data/Items');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Animated,
  Easing,
  Image
  
} = React;


var Experience = React.createClass({
  
   

  getInitialState() {
    return {
      fadeAnim: new Animated.Value(Monsters.player.experienceGained),
      fadeLost: new Animated.Value(Monsters.player.experienceTotal - Monsters.player.experienceGained),
      newGainedValue: (Monsters.enemy[0].experience + Monsters.player.experienceGained),
      newToGoValue: (Monsters.player.experienceTotal) - (Monsters.enemy[0].experience + Monsters.player.experienceGained),
      item: null,
      leveledUp: null
    }

  },

  componentDidMount() {
    this.itemGenerator()
     setTimeout(() => this.animateExpBar(), 2000)   

   },

   animateExpBar: function() {
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
   },

   itemGenerator: function() {
      var randomItem = Math.floor(Math.random() * Items.items.length);
      // determine enemy monster monsterRandomizer(player)
      var randomNumber =  Math.random();
      if (randomNumber < Monsters.enemy[0].itemSpawn) {
      this.setState({item: Items.items[randomItem]});
      } else {
        this.setState({item: null});
      }
   },


   renderItem: function() {
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
   },

   renderLevelGained: function() {
      if (this.state.leveledUp) {

        return <View>
            <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2}}>
            <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>
            Level Gained
            </Text>
           </View>
            <View style={{flex: 4, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  Attack: 13 -> 14
                </Text>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  Defense: 13 -> 14
                </Text>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  SpecialAtt: 13 -> 14
                </Text>
              </View>
              <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'flex-start' }}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  SpecialDef: 13 -> 14
                </Text>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  Speed: 13 -> 14
                </Text>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  Evasion: 13 -> 14
                </Text>
              </View>
           </View>
          </View>
      } else {

          return <View style={{flex: 7}}>
          </View>
      }
   },





 

  render: function() {
    
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
                  <Animated.View style={{flex: this.state.fadeAnim, backgroundColor: 'rgba(0,0,255,1)', borderWidth: 1, borderRadius: 5, borderColor: 'white', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0,height: 15, marginLeft: 30}}>
                  </Animated.View>
                  <Animated.View style={{flex: this.state.fadeLost, backgroundColor: 'rgba(0,0,0,0)', borderWidth: 1, height: 15, borderRadius: 5, borderColor: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0, marginRight: 30}}>
                  </Animated.View>
                  <Animated.Text style={{color: 'white'}}>
                    {this.state.fadeLost} 
                  </Animated.Text>
                </View>
             
           </View>

           {this.renderLevelGained()}
           {this.renderItem()}
          
          


            </Image>
          
         </View>
      )
  },


  
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
   }
});

module.exports = Experience;