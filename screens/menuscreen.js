import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Menuscreen extends Component {

  

  render() {
    return (
      <View style={styles.container}>
            <Text style={{fontSize:25,marginTop:20,marginBottom:20}}>Wellcome To Nav</Text>
            <TouchableHighlight
            onPress={() => {
                this.props.navigation.closeDrawer();
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-home" size={30} color="#ffffff" /> Home</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => {
                this.props.navigation.navigate('New');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-mail" size={30} color="#ffffff" /> News</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => {
                this.props.navigation.navigate('About');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-person" size={30} color="#ffffff" /> About</Text>
          </View>
        </TouchableHighlight>
        <View>
        <TouchableHighlight
            onPress={() => {
                this.props.navigation.navigate('Login');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-person" size={30} color="#ffffff" /> Login</Text>
          </View>
        </TouchableHighlight>
        </View>
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  button: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 10,
    color: 'black',
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

