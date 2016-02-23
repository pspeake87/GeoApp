

'use strict';

var React = require('react-native');
var Main = require('./Main');
var Battler = require('./Battler');

var {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
  Text
  
} = React;



var OpenScreen = React.createClass({


  render: function() {

  
   return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => this.props.navigator.push({name: 'radar', index: 1})}>
           <Image style={{flex: 1}}
           source={{uri: 'geoQuest.jpg'}}
           resizeMode={'stretch'}>
           <View style={{flex: 2}}>
           </View>
           <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <Text style={{flex: 1, fontSize: 20, color: 'white'}}>
              Tap to start
             </Text>
           </View>
           </Image> 

        </TouchableWithoutFeedback>  
      </View>
    );
  
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
});


module.exports = OpenScreen;