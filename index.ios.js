

'use strict';

var React = require('react-native');
var Main = require('./Main');
var Battler = require('./Battler');

var {
  AppRegistry,
  StyleSheet,
  
  View,
  
} = React;



var GeoApp = React.createClass({


  render: function() {

  
   return (
      <View style={styles.container}>
          <Main />    
      </View>
    );
  
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});



AppRegistry.registerComponent('GeoApp', () => GeoApp);
