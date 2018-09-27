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

import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator({
  Home: {
    screen: Homescreen
  },
  Register: {
    screen: Registerscreen
  },
  Login:{
    screen:Loginscreen
  }
});

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
  Home: HomeStack,
  About: AboutStack,
  New: NewStack,
  Product: ProductStack,
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
        iconName = `ios-basket${focused ?'':''}`;
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
