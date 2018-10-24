import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

export default class Test3Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        myKey: null
    }
  }

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({myKey: value});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async resetKey() {
    try {
      await AsyncStorage.removeItem('@MySuperStore:key');
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({myKey: value});
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }
 async test3(){
    const {value, value2} = this.state
    let regphone = await AsyncStorage.getItem('phone:key')        
    let regciticen = await AsyncStorage.getItem('citizen:key') 
    if (regphone == null || regciticen == null){
      Alert.alert("Invalid Account")
      return
  }

  if (regphone == value && regciticen == value2){
      Alert.alert("Login Successful")
      this.props.navigation.navigate("Home")
  }else{
      Alert.alert("Invalid Account")
  } 
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Demo AsyncStorage!
        </Text>
        <TextInput
                        onChangeText={(text)=> this.setState({value: text})}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="Username"
                    />

                    <TextInput
                        onChangeText={(text)=> this.setState({value2: text})}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                    />

                    <TouchableHighlight
                        onPress={this.test3.bind(this)}
                        style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>
                            Login
                         </Text>
                    </TouchableHighlight>
       


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  formInput: {
    paddingLeft: 5,
    height: 50,
    borderWidth: 1,
    borderColor: "#555555",
  },
  formButton: {
    borderWidth: 1,
    borderColor: "#555555",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5,
  },
  banner: {
    height: 90,
    width: '100%'
},
input: {
    height: 50,
    width: '100%',
    marginTop: 10,
    padding: 4,
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec33'
},
loginButton: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center'
},
registerButton: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
},
loginButtonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
},
registerButtonText: {
    fontSize: 18,
    color: '#0007',
    alignSelf: 'center'
},
heading: {
    fontSize: 30,
    marginBottom: 40
},
error: {
    color: 'red',
    paddingTop: 10
},
success: {
    color: 'green',
    paddingTop: 10
},
loader: {
    marginTop: 20
}
});

