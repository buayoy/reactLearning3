import React, { Component } from 'react';
import { AsyncStorage,Alert,TextInput, AppRegistry,Picker, Platform, StyleSheet,ScrollView, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { FormLabel, FormInput, FormValidationMessage, Button ,Card } from 'react-native-elements'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import { FormLabel, FormInput, FormValidationMessage, Button ,Card } from 'react-native-elements'
import Logo from '../components/logo/index'
import axios from 'axios';

export default class Profile2screen extends Component {
  constructor(props){

    super(props);

    this.state={

      // This is our Default number value
     
      citizenID:'',
      phonenumber:'',
      text:'',
      firstname:'',
      lastname:'',

    }
  }
  // state = {user: ''}
  // updateUser = (user) =>{
  //    this.setState({ user: user })
  // }
  static navigationOptions = {
    headerTitle: <Logo/>,
    headerStyle: {
      backgroundColor: '#006600',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
addProfile=async()=>{
  const {phonenumber,citizenID} = this.state
    const response = await axios.post('http://localhost:8000/api/otp4/insert',{
            otp_PhoneNumber:this.state.phonenumber,
            otp_Text:this.state.text,
            otp_CitizenID:this.state.citizenID
            
        });

        
}      
  
  render() {
   

    return (
      <View>
       <Text>Hello Profile</Text>
       <KeyboardAwareScrollView>
            <Card containerStyle={{padding: 0 ,borderRadius:7 , marginBottom:10,borderColor:'#7CFC00'}} >
          <Text style={styles.labelStyle}>เลขประจำตัวประชาชน</Text>
          <TextInput
            
            ref={citizenID => this.citizenID = citizenID}
            // keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            maxLength = {13}
            placeholder='กรอกเลขบัตรประจำตัวประชาชน'
            // onChangeText={ citizenID => this.setState({ citizenID })}
            // keyboardType='email-address'
          />
            
          <Text style={styles.labelStyle}>เบอร์โทรศัพท์</Text>
          <TextInput
           
            ref={phonenumber => (this.phonenumber = phonenumber)}
            //keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength = {10}
            style={styles.input}
            placeholder="กรอกเบอร์โทรศัพท์"
            // onChangeText={phonenumber => this.setState({ phonenumber })}
            // secureTextEntry={true}
          />
          
          
           <View style={{ flexDirection:'row' ,flex:1 ,justifyContent:'center' ,marginBottom:20}}>
          <Button
            backgroundColor='#006600'
            buttonStyle={{ marginTop: 30 ,borderRadius:10 ,width:110 , }}
            // large
            title='ยืนยัน'
            // onPress={  this._Verify }
           
            
            //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
          /><Button
          backgroundColor='#006600'
          buttonStyle={{ marginTop: 30 ,borderRadius:10,width:110 , borderWidth: 1 ,borderColor:'#7CFC00' }}
          // large
          title='ยกเลิก'
          backgroundColor='#FFFFFF'
          color="#006600"
          onPress={()=> this.props.navigation.goBack()}
         
          
          //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
        />
         </View>
         </Card>
        </KeyboardAwareScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#DCDCDC',
    flexDirection: 'column'
  },
  input:{height: 50,
    width: '90%',
    marginTop: 10,
    marginLeft:18,
    padding: 4,
    borderRadius: 5,
    fontSize: 18,
    color:'#006600',
    borderWidth: 1,
    borderColor: '#48bbec33'},
  buttonText: {
    padding: 20,
    color: 'black'
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
 },
 labelStyle:{
   fontSize:18,
   color:'#006600',
   marginLeft:20,
   marginTop:10
 }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

