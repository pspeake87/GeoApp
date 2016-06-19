import React, {Component, PropTypes } from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';

import cssVar from '../Lib/cssVar';


import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  MapView} from 'react-native'


class Radar extends Component {


  constructor(props) {
      super(props);

      this.state = {
          zoom: 16,
          pos: 'unknown',
          annotations: [],
          message: "",
      }

  }


  menuButton() {

    setTimeout(() => {
      this.props.navigator.push({name: 'menu'})
    }, 500);

  }



  scanMonsters() {


    navigator.geolocation.getCurrentPosition(
      (position) => {

        var annotations = [];
        this.state.message = "Scanning...";
        for (var i = 0; i < 150; i++) {
          if (i % 10 == 0) {
            var pos = {
              latitude: parseFloat((position.coords.latitude - 0.004) + 0.008 * Math.random()),
              longitude: parseFloat((position.coords.longitude - 0.004) + 0.008 * Math.random()),
              view: <Image style={{height:15, width: 15}} source={require('../Assets/Images/redcross.png')}/>,
            };
          } else {
            var pos = {
              latitude: parseFloat((position.coords.latitude - 0.004) + 0.008 * Math.random()),
              longitude: parseFloat((position.coords.longitude - 0.004) + 0.008 * Math.random()),
              view: <Image style={{height:15, width: 15}} source={require('../Assets/Images/radarMarker.png')}/>,
            };
          }
          annotations.push(pos);
        }
        this.setState({annotations});


      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }


  findMonster() {

    function distanceBetweenMarkers(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1);  // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      d = d * 1000;
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180)
    }


    navigator.geolocation.getCurrentPosition(
      (position) => {
        var loc = position;
        var markers = this.state.annotations;
        var found = false;
        var healerfound = false;

        for (var i = 0; i < markers.length; i++) {

          if (distanceBetweenMarkers(markers[i].latitude, markers[i].longitude, loc.coords.latitude, loc.coords.longitude) < 25) {
            if (markers[i].id == "Healer") {
              healerfound = true;
              break;
            } else {
              found = true;
              markers.splice(i, 1);
              break;
            }
          }

        }

        if (found) {

          this.setState({message: "I found a monster!!"});

          setTimeout(() => {
            this.setState({message: "Prepare for an attack..."})
          }, 1000);
          setTimeout(() => {
            Actions.battler()
          }, 3000);
        } else if (healerfound) {
          this.setState({message: "I found some food!"});
          Monsters.player.currentHp = Monsters.player.maxHp;
        } else {
          this.setState({message: "I found nothing"});
        }
      });
  }

  onPressButton() {


  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          annotations={this.state.annotations}
          showsUserLocation={true}
          followUserLocation={true}
          />

        <View style={styles.imageBackground}>

          <Image
            style={styles.image}>

            <View style={styles.chatBox}>
              <Text style={styles.buttonText}>
                {this.state.message}
              </Text>
            </View>

            <View style={styles.moveBox}>
              <TouchableHighlight
                style={styles.buttons}
                onPress={this.scanMonsters.bind(this)}
                onHideUnderlay={this.onPressButton}>
                <Text style={styles.buttonText}>
                  Scan
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.buttons}
                onPress={this.findMonster.bind(this)}
                onHideUnderlay={this.onPressButton}>
                <Text style={styles.buttonText}>
                  Search
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.buttons}
                onPress={this.menuButton}
                onHideUnderlay={this.onPressButton}>
                <Text style={styles.buttonText}>
                  Menu
                </Text>
              </TouchableHighlight>

            </View>

          </Image>

        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    opacity: 1.5,


  },
  image: {
    flex: 1,
    opacity: 1,
    borderRadius: 15

  },
  map: {
    flex: 3,
    borderWidth: 5,


  },
  chatBox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    height: 30,
    borderColor: "#000000",

    justifyContent: "center",
    alignItems: "center",
    opacity: 1,

  },
  moveBox: {
    flexDirection: "row",
    flex: 2.5,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: "center",
    alignItems: "center",
    opacity: 1
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
  buttonText: {

    color: '#f33333',
    fontFamily: 'Copperplate-Bold',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: "center"
  },
  chatText: {

    color: '#323232',
    fontFamily: 'Copperplate-Bold',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: "center"
  },
  imageBackground: {
    backgroundColor: 'black',
    flex: 1,
    overflow: 'visible',
    borderWidth: 5

  }
});

export default Radar;
