'use strict';

const React = require('react-native');
const cssVar = require('../Lib/cssVar');


const {
  Component,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  } = React;


const Menu = React.createClass({


  mapButton() {
    debugger;
    this.props.navigator.pop();
  },

  glossaryButton() {
    this.props.navigator.push();
  },

  volumeButton() {

  },

  profileButton() {

  },

  itemsButton() {

  },

  componentDidMount() {
    debugger;

  },


  render(){

    return (
      <View style={styles.container}>

        <TouchableHighlight
          style={styles.buttons}
          onPress={this.glossaryButton}>
          <Text style={styles.buttonText}>
            Glossary
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttons}
          onPress={this.itemsButton}>
          <Text style={styles.buttonText}>
            Items
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttons}
          onPress={this.volumeButton}>
          <Text style={styles.buttonText}>
            Volume
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttons}
          onPress={this.profileButton}>
          <Text style={styles.buttonText}>
            Profile
          </Text>
        </TouchableHighlight>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center'

  },
  buttonText: {

    color: '#f33333',
    fontFamily: 'Copperplate-Bold',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: "center"
  },
  buttons: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f33333',
    height: 50,
    width: 200,
    margin: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});

module.exports = Menu;