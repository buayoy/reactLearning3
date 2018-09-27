import React, { Component } from 'react';

import {
  Alert, AppRegistry, Platform, StyleSheet, Text,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
  TouchableWithoutFeedback, View ,AsyncStorage
} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import axios from 'axios';


export default class Loginscreen extends Component {

  state = {
    email: '',
    password: '',
  }
  static navigationOptions = {
    title: 'ลงชื่อเข้าใช้',
    headerStyle: {
      backgroundColor: '#006600',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
 async getProfile(){
     //get access_token
        const value = await AsyncStorage.getItem('token')
        const token = JSON.parse(value)
        const access_token= token.access_token
      
    //   alert(JSON.stringify(access_token))
       //get Profile
       const response = await axios.get('https://jerawut.auth0.com/userinfo',{
        headers:{
            Authorization: "Bearer "+access_token
        }
    });
    AsyncStorage.setItem('profile',JSON.stringify(response.data));
    console.log(response.data)
  }
  _Login=async()=>{
      try{
        const response = await axios.post('https://jerawut.auth0.com/oauth/token',{
            grant_type: 'password',
            username: this.state.email,
            password: this.state.password,
            audience: 'https://jerawut.auth0.com/api/v2/',
            scope: 'openid',
            client_id: 'iMYXFZWu9GptbyQvuxcKzbjkcMh7Jm7l',
        });
        AsyncStorage.setItem('token',JSON.stringify(response.data));
        // console.log(response.data)
        this.getProfile();
        this.props.navigation.navigate('Home');
        alert(response.data)
        }catch(error){
          console.log(error);
      }
    
    
  }
  _Register = () => {
      this.props.navigation.navigate('Register')
      
  }

  render() {
    return (
      <View style={styles.container}>


        <KeyboardAwareScrollView>
          
          <FormLabel>อีเมล</FormLabel>
          <FormInput
            inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
            ref={email => this.email = email}
            placeholder='กรอก Email ของท่าน'
            onChangeText={
              email => this.setState({ email })
            }
            keyboardType='email-address'
          />

          <FormLabel>พาสเวิร์ด</FormLabel>
          <FormInput
            inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
            ref={password => (this.password = password)}
            placeholder='กรอกชื่อพาสเวิร์ด'
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
          />
        </KeyboardAwareScrollView>

        <View style={{ flexDirection: 'row',justifyContent: 'space-around',}}>
          <Button
            backgroundColor='#006600'
            // buttonStyle={{ marginTop: 30 }}
            large
            title='ลงชื่อเข้าใช้'
            onPress={ this._Login }

          />
          <Button
            backgroundColor='#006600'
            // buttonStyle={{ marginBottom: 30 }}
            large
            title='ลงทะเบียน'
            onPress={ this._Register }

          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#F5FCFF',
  }
});