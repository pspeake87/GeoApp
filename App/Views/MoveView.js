import React, {Component, PropTypes } from 'react';

import cssVar from '../Lib/cssVar';


import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight} from 'react-native'


module.exports = class MoveView extends Component {

  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {

    return(
    <View>
      {this.buttons()}
    </View>
    );

  }

  buttons() {

    if (this.props.move) {
      return(
      <TouchableHighlight style={cssVar('buttons')} onPress={this.props.press}>
        <Text style={cssVar('buttonText')}>
          {this.props.move}
        </Text>
      </TouchableHighlight>
      );
    }
  }

}
