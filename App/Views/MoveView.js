'use strict';

const React = require('react-native');
const cssVar = require('../Lib/cssVar');

const {
  Component,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight

  } = React;


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
