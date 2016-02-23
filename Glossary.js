'use strict';

var React = require('react-native');


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ScrollView
  
} = React;


var Glossary = React.createClass({

  

  render: function(){
    
      return (
        <View style={styles.container}>
         <ScrollView
         bounces={false}
         maximumZoomScale={5}
         minimumZoomScale={0.1}>
          <Image style={{flex: 1, height: 2000, width: 2000}}
           source={{uri: 'background2.jpg'}}>
           </Image>
           </ScrollView>
        </View>
      )
  } 

  


});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
   
});

module.exports = Glossary;