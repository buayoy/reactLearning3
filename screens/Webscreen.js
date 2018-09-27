import React, { Component } from 'react';
import { WebView,Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

export default class WebScreen extends Component {

    static navigationOptions = {
        title: 'รายละเอียดข่าว',
      };

  
  render() {
    return (
      <WebView source={{uri:this.props.navigation.getParam('url','')}}
      style={{marginTop:0}}
      useWebkit={true}
      />
    );
  }
}


// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

