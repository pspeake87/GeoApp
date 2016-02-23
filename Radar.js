'use strict';

var Monsters = require('./Data/Monsters');
var React = require('react-native');
var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';
var Sound = require('react-native-sound');

var click = new Sound('clicker.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
  } else { // loaded successfully 
    
  }
});

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

var Radar = React.createClass({
    mixins: [Mapbox.Mixin],
    


  getInitialState() {
    return {
      zoom: 16,
      pos: 'unknown',
      annotations: [],
      message: "",    

     
    };  
  },


 
 menuButton: function() {
   
   setTimeout(() => {this.props.navigator.push({name: 'menu'})}, 500);

 },

playClick: function() {
    click.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
},

 scanMonsters: function() {
   
   navigator.geolocation.getCurrentPosition(
      (position) => {
        
        var annotations = [];
        this.state.message = "Scanning...";
        for (var i = 0; i<150; i++) {
          if(i % 10 == 0) {
            var pos = {
                coordinates: [parseFloat((position.coords.latitude - 0.004) + 0.008 * Math.random()), parseFloat((position.coords.longitude - 0.004) + 0.008 * Math.random())],
                type: "point",
                annotationImage: {
                  url: 'image!redcross.png',
                  height: 15,
                  width: 15
                },
                id: "Healer",
             };
          } else {
             var pos = {
                coordinates: [parseFloat((position.coords.latitude - 0.004) + 0.008 * Math.random()), parseFloat((position.coords.longitude - 0.004) + 0.008 * Math.random())],
                type: "point",
                annotationImage: {
                  url: 'image!radarMarker.png',
                  height: 15,
                  width: 15
                },
                id: "Monster" + i,
             };
           }
             annotations.push(pos);
        }
        this.setState({annotations});
        

      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );   
 },


 findMonster: function() {
    
    function distanceBetweenMarkers(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      d = d * 1000;
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    
   
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var loc = position;
      var markers = this.state.annotations;
      var found = false; 
      var healerfound = false;

    for (var i = 0; i < markers.length; i++) {
         
            if (distanceBetweenMarkers(markers[i].coordinates[0], markers[i].coordinates[1], loc.coords.latitude, loc.coords.longitude) < 25) {
                if (markers[i].id == "Healer") {
                    healerfound = true;
                    break;
                } else {
                found = true;  
                this.removeAnnotation(mapRef, markers[i].id);
                markers.splice(i,1);
                break;
              }
            } 
             
     }

        if (found) {
                        
            this.setState({message: "I found a monster!!"}); 

            setTimeout(() => {this.setState({message: "Prepare for an attack..."})}, 1000);
            setTimeout(() => {this.props.navigator.push({name: 'battler', index: 2})}, 3000);
        } else if (healerfound) {
            this.setState({message: "I found some food!"});
            Monsters.player.currentHp = Monsters.player.maxHp;
        } else {
            this.setState({message: "I found nothing"});
        }
    });
 },

 onPressButton: function() {
    
    this.playClick();
 },

  render: function(){
    return (
        <View style={styles.container}>
              <Mapbox
              style={styles.map}
              ref={mapRef}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
              annotations={this.state.annotations}
              showsUserLocation={true}
              userTrackingMode={this.userTrackingMode.follow}
              zoomLevel={this.state.zoom}
              logoIsHidden={false}
              attributionButtonIsHidden={false}
              accessToken={'pk.eyJ1IjoicHNwZWFrZTg3IiwiYSI6ImNpam5ybzQwZzAwcmh2YWx4Z2doanZsNzQifQ.bE66sEmpxKNzXwX6no3ixQ'}
              styleURL={'mapbox://styles/pspeake87/cijoqxspt000i8wkl2fnoixq8'}/>
              
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
                          onPress={this.scanMonsters}
                          onHideUnderlay={this.onPressButton}>
                              <Text style={styles.buttonText}>
                                Scan
                             </Text> 
                      </TouchableHighlight>

                      <TouchableHighlight
                          style={styles.buttons}
                          onPress={this.findMonster}
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
});

var styles = StyleSheet.create({
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
    backgroundColor:'rgba(0,0,0,0)',
    height: 30,
    borderColor: "#000000",
    
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,

  },
  moveBox: {
    flexDirection: "row",
    flex: 2.5,
    backgroundColor:'rgba(0,0,0,0)',
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
    backgroundColor:'rgba(0,0,0,0)',
    alignItems: "center"
  },
  chatText: {
    
    color: '#323232',
    fontFamily: 'Copperplate-Bold',
    fontSize: 20,
    backgroundColor:'rgba(0,0,0,0)',
    alignItems: "center"
  },
  imageBackground: {
    backgroundColor:'black',
    flex: 1,
    overflow: 'visible',
    borderWidth: 5
    
  }
});

module.exports = Radar;