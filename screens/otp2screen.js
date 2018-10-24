import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

export default class Otp2tscreen extends Component {

    static navigationOptions = {
        title: 'About Page',
      };

  _onPressButton() {
    Alert.alert('Wait')
  }
_getParam=()=>{
  var params = this.props.navigation.getParam("otp");
    const {text} = params;
    if(otp==text){
      this.props.navigation.navigate('Home')
    }else{
      this.props.navigation.navigate('About')
    }
}
  render() {
    
    return (
      <View style={styles.container}>
            <Text style={styles.buttonText}>กรอกรหัส OTP</Text>
            <FormInput
            inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
            placeholder='กรอกรหัส OTP'
            // secureTextEntry={true}
          />
           <View style={{ flexDirection: 'row',justifyContent: 'space-around',}}>
          <Button
            backgroundColor='#006600'
            // buttonStyle={{ marginTop: 30 }}
            large
            title='ลงชื่อเข้าใช้'
            onPress={this._getParam}
            //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
          />
          </View>
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

