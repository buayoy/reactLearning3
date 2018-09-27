import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

export default class Aboutscreen extends Component {

    static navigationOptions = {
        title: 'About Page',
      };

  _onPressButton() {
    Alert.alert('Wait')
  }

  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.buttonText}>Welcome to App (aboutscreen)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  buttonText: {
    padding: 20,
    color: 'black'
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

