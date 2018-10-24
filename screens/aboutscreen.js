import React, { Component } from 'react';
import { AsyncStorage,TextInput, Text, View, Button ,StyleSheet ,AppRegistry} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class Aboutscreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        myKey: null,
        value:null,
        value2:null,
        user:{}
    }
  }
    static navigationOptions = {
        title: 'About Page',
      };

  _onPressButton() {
    Alert.alert('Wait')
  }

  render() {
    AsyncStorage.getItem('user').then(user=>{
      this.setState({
        user:JSON.parse(user)
      });
    });
    return (
      <View>
    <Text style={{fontSize:18 , fontWeight:'bold'}}>{/*{this.state.user.phone}*/}test</Text>

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
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
 }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

