'use strict';

var React = require('react-native');


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
  
} = React;


var MoveView = React.createClass({
  
  getInitialState() {
    return {
      
    }

  },

  

 
  

  render: function() {
    
      return  <View>
         {this.buttons()}
         
      </View>
            
  },

  buttons: function() {
     if (this.props.move) {
     return <TouchableHighlight style={styles.buttons} onPress={this.props.press}>
     <Text style={styles.buttonText}>
        {this.props.move}
     </Text>
     </TouchableHighlight>
     }
  },




  
});

var styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
   },

    buttons: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f33333',
    padding: 15,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    
    color: '#f33333',
    fontFamily: 'Copperplate-Bold',
    fontSize: 20,
    backgroundColor:'rgba(0,0,0,0)',
    alignItems: "center"
  },
});

module.exports = MoveView;