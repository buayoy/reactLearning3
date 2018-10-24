import React, { Component } from 'react';
import {AsyncStorage,ScrollView, Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import Logo from '../components/logo/index'
import { Dropdown } from 'react-native-material-dropdown';
const IoniconsHeaderButton = passMeFurther => (
    <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
  );


export default class Home2screen extends Component {
  constructor(props) {
    super(props);
    
    AsyncStorage.getItem('user').then(user=>{
      this.setState({
        user:JSON.parse(user)
      });
    })
    this.state = {
      user:{
        // phone:'',
        // citizen:''
      }
    }
  }
    
  Profile=()=>{
    
    if(this.state.user.phone = null){
      // this.props.navigation.navigate('Profile')
      Alert.alert('null')
    }else{
      // this.props.navigation.navigate('Verify')
      Alert.alert('not null')
    };
  }
    static navigationOptions  = ({navigation}) => ({
      
        headerTitle: <Logo/>,
        
        headerLeft: ( 
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}
            >
              <Item 
              title="menu" iconName="ios-exit" onPress={()=>{
                // Alert.alert('test')
               
              }}
              // AsyncStorage.removeItem('user')
              />
            </HeaderButtons>
          ),
          
          headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              {
              <Item 
              title="register" iconName="ios-person" onPress={() => navigation.navigate('About')} 
              />
              }
            </HeaderButtons>
          ),
            
        headerStyle: {
            backgroundColor: '#006600',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex:1
          },
      });
     
  render() {
    
    
                 
    return (
      <ScrollView>
      <View style={styles.container}>
      <Text style={styles.MyText} >Welcome</Text>
      <Text style={styles.Text} >to my application</Text>
      <Text style={styles.Text} >ยินดีต้อนรับ
      {/* {this.state.user.citizen}' */}
      </Text>

        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('Product');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}>
            <Icon name="ios-basket" size={30} color="#ffffff" /> Product</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('Profile');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-basket" size={30} color="#ffffff" /> OTP</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('Verify');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-basket" size={30} color="#ffffff" /> Verify</Text>
          </View>
        </TouchableHighlight>
        
        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('AddProfile');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-person" size={30} color="#ffffff" /> AddProfile</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('Test');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-person" size={30} color="#ffffff" /> test</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('Test2');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-person" size={30} color="#ffffff" /> test2</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('Test3');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-person" size={30} color="#ffffff" /> test3</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('Slider');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-person" size={30} color="#ffffff" /> Slider</Text>
          </View>
        </TouchableHighlight>
      </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  MyText: {
    fontSize: 40,
    color: 'black'
  },
  Text: {
    fontSize: 20,
    color: 'black'
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

