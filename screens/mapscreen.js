import React, { Component } from 'react';
import {Image ,Dimensions, Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import MapView , {Marker,Callout} from 'react-native-maps';
import flagImg from '../img/flag-blue.png'
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 13.9587352;
const LONGITUDE = 100.6001921;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Mapscreen extends Component {

    static navigationOptions = {
        title: 'Map',
      };

      

  render() {
    return (
      <View style={styles.container}>
      <MapView
         style={styles.map}
         region={{
           latitude: LATITUDE,
           longitude: LONGITUDE,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
         }}
       >
       <Marker 
       coordinate={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
       }}
       image={flagImg}
       ><Callout>
         <View>
           <Text>
             บ้านกู
           </Text>
         </View>
       </Callout>

       </Marker>
       </MapView>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

