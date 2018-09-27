/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableHighlight,Alert} from 'react-native';
import AppHeader from "./components/appheader/index"
import Workshop15 from "./Mainpage"
import HomePage from "./navigation5"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }
  render() {
    return (
      <View style={styles.container}>
      {/* <AppHeader/> */}
      {/* <Workshop15/> */}
      <View style={{flexDirection:1 , marginTop:15}}>

        <Text style={styles.welcome}>Welcome to/__/_/_/____//_/_/_!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={{color:'blue',fontWeight:'bold',fontSize:70}}>สวัสดี</Text>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        

        <Text style={styles.instructions}>{instructions}</Text>

       </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF00',
    marginTop:20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#FF00FF',
    
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
});
