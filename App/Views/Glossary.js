'use strict';

const React = require('react-native');
const cssVar = require('../Lib/cssVar');


var {
  Component,
  View,
  Text,
  TouchableHighlight,
  Image,
  ScrollView
  
} = React;


module.exports = class Glossary extends Component {

  

  render(){
    
      return (
        <View style={cssVr('flex')}>
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

}