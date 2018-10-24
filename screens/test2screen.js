import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  AsyncStorage,
  Alert
} from 'react-native';

export default class AsyncStorageExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
        myKey: null,
        myKey2 :null
    }
  }

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      // const value2 = await AsyncStorage.getItem('@MySuperStore:key2');
      this.setState({myKey: value});
      // this.setState({myKey2: value2});

      Alert.alert(myKey)

    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }
  async getKey2() {
    try {
      // const value = await AsyncStorage.getItem('@MySuperStore:key');
      const value2 = await AsyncStorage.getItem('@MySuperStore:key');
      // this.setState({myKey: value});
      this.setState({myKey2: value2});

      Alert.alert(myKey)

    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }


  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
      await AsyncStorage.setItem('@MySuperStore:key', value2);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async resetKey() {
    try {
      await AsyncStorage.removeItem('@MySuperStore:key');
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      const value2 = await AsyncStorage.getItem('@MySuperStore:key2');
      this.setState({myKey: value});
      this.setState({myKey2: value2});
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Demo AsyncStorage!
        </Text>

        <TextInput
          style={styles.formInput}
          placeholder="Enter key you want to save!"
          value={this.state.myKey}
          onChangeText={(value) => this.saveKey(value)}
          />
          <TextInput
          style={styles.formInput}
          placeholder="Enter key you want to save!"
          value={this.state.myKey2}
          onChangeText={(value2) => this.saveKey(value2)}
          />

        <Button
          style={styles.formButton}
          onPress={this.getKey.bind(this)}
          title="Get Key1"
          color="#2196f3"
          accessibilityLabel="Get Key"
        />
        <Button
        style={styles.formButton}
        onPress={this.getKey2.bind(this)}
        title="Get Key2"
        color="#2196f3"
        accessibilityLabel="Get Key"
      />

        <Button
          style={styles.formButton}
          onPress={this.resetKey.bind(this)}
          title="Reset"
          color="#f44336"
          accessibilityLabel="Reset"
        />

        <Text style={styles.instructions}>
          Stored key is = {this.state.myKey}
          Stored key is = {this.state.myKey2}

        </Text>


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
});

