'use strict';

const React = require('react-native');
const Main = require('./Main');
const Battler = require('./Battler');
const cssVar = require('../Lib/cssVar');

const {
  Component,
  Image,
  View,
  TouchableWithoutFeedback,
  Text

  } = React;


module.exports = class OpenScreen extends Component {


  render() {


    return (
      <View style={cssVar('flex')}>

        <TouchableWithoutFeedback
          style={cssVar('flex')}
          onPress={() => this.props.navigator.push({name: 'radar', index: 1})}>

          <Image style={cssVar('flex')}
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

}



