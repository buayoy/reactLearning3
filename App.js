import React, { Component } from 'react';
//import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import {YellowBox} from 'react-native'
console.disableYellowBox=true;

import { createStackNavigator,createBottomTabNavigator,createDrawerNavigator } from 'react-navigation';

import Homescreen from "./screens/homescreen"
import Newscreen from "./screens/newscreen"
import Aboutscreen from "./screens/aboutscreen"
import Menuscreen from "./screens/menuscreen"
import Productscreen from "./screens/product"
import Registerscreen from "./screens/registerscreen"
import Detailscreen from "./screens/datailscreen"
import WebScreen from './screens/Webscreen'
import Loginscreen from './screens/loginscreen'
import Camerascreen from './screens/camerascreen'
import Mapscreen from './screens/mapscreen'

import Icon from 'react-native-vector-icons/Ionicons'
import Otp2screen from './screens/otp2screen'
// import Otp2screen from './screens/otp2sceen'
import Verifyscreen, { AddProfile } from './screens/verifyscreen'
import Profilescreen, { EditProfilescreen } from './screens/profilescreen';
import Testscreen from './screens/testscreen';
import Test2screen from './screens/test2screen';
import Test3Screen from './screens/test3screen';
import SliderSwiper from './components/imgSlider';
import AppHeader from './components/appheader';
import Workshop15 from './screens/Workshop15';
import Profile2screen from './screens/profile2screen';
import ReportScreen_create from './screens/reportscreen';

// const HeaderStack = createStackNavigator({
//   Header:{
//     screen: AppHeader
//   },
// });


const HomeStack = createStackNavigator({
  
  Home: {
    screen: Homescreen
  },
  Profile2:{
    screen:Profile2screen
  },
  Register: {
    screen: Registerscreen
  },
  Login:{
    screen:Loginscreen
  },
  Map:{
    screen:Mapscreen
  },
  Otp2:{
    screen:Otp2screen
  },
  Verify:{
    screen:Verifyscreen
  },
  Profile:{
    screen:Profilescreen
  },
  Test:{
    screen:Testscreen
  },
  Test2:{
    screen:Test2screen
  },
  AddProfile:{
    screen:AddProfile
  },
  Test3:{
    screen:Test3Screen
  },
  Slider:{
    screen:SliderSwiper
  },
  Workshop15:{
    screen:Workshop15
  },
  AddProfile:{
    screen:AddProfile
  },
  EditProfile:{
    screen:EditProfilescreen
  }
  
  
 
});

const ReportStack = createStackNavigator({
  Report: {
    screen: ReportScreen_create
  },
})
const CameraStack = createStackNavigator({
  Camera: {
    screen: Camerascreen
  },
});
CameraStack.navigationOptions = {
  tabBarLabel: 'กล้อง'
}

HomeStack.navigationOptions = {
  tabBarLabel: 'หน้าหลัก'
}

const AboutStack = createStackNavigator({
  About: {
    screen: Aboutscreen
  }
});
AboutStack.navigationOptions = {
  tabBarLabel: 'เกี่ยวกับเรา'
}

const ProductStack = createStackNavigator({
  Product:{
    screen: Productscreen
  },
  Detail:{
    screen: Detailscreen
  }
});
ProductStack.navigationOptions={
  tabBarLabel:'สินค้า'
}
const NewStack = createStackNavigator({
  New: {
    screen: Newscreen
  },
  Web:{
    screen:WebScreen
  }
},{
  navigationOptions:{
    title:'ข่าวสา่ร',
    headerStyle:{
      backgroundColor:'#21A5EC'
    },
    headerTintColor:'#fff'
  }
});
NewStack.navigationOptions = {
  tabBarLabel: 'ข่าวสาร'
}


//tab Nevigater
const TabNavigator = createBottomTabNavigator({
  // Header:HeaderStack,
  Home: HomeStack,
  About: AboutStack,
  New: NewStack,
  Product: ProductStack,
  Camera:CameraStack,
  Reprot:ReportStack
  
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : ''}`;
      } else if (routeName === 'New') {
        iconName = `ios-mail${focused ? '' : ''}`;
      } else if (routeName === 'About') {
        iconName = `ios-person${focused ? '' : ''}`;
      }else if(routeName === 'Product'){
        iconName = `ios-basket${focused ? '':''}`;
      }else if(routeName === 'Camera'){
        iconName = `ios-camera${focused ? '':''}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Icon name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#21A5EC',
    inactiveTintColor: 'gray',
  },
})

//drower Nevigator
const DrawerNavigator = createDrawerNavigator({
  TabNavigator,
  Menu: Menuscreen,
},
{
drawerPosition: "left",
contentComponent: props => <Menuscreen {...props} />
}
);

export default class App extends Component {
  render() {
    return <DrawerNavigator />;
  }
}
