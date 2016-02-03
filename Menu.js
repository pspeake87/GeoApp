'use strict';

var React = require('react-native');


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
  
} = React;


var Menu = React.createClass({

  mapButton: function() {
     this.props.navigator.pop();
  },

  render: function(){
    
      return (
        <View style={styles.container}>
          <Text>
            Im in the Menu
          </Text>

          <TouchableHighlight
            style={styles.buttons}
            onPress={this.mapButton}>
               <Text style={styles.buttonText}>
                  Back
               </Text>
          </TouchableHighlight>
        </View>
      )
  } 

  


});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
   buttonText: {
    
    color: '#f33333',
    fontFamily: 'Copperplate-Bold',
    fontSize: 20,
    backgroundColor:'rgba(0,0,0,0)',
    alignItems: "center"
  },
  buttons: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f33333',
    height: 50,
    width: 100,
    margin: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});

module.exports = Menu;