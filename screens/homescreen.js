import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import Logo from '../components/logo/index'
const IoniconsHeaderButton = passMeFurther => (
    <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
  );


export default class Homescreen extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: <Logo/>,
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item title="menu" iconName="ios-menu" onPress={() => navigation.openDrawer()} />
            </HeaderButtons>
          ),
          headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item title="register" iconName="ios-person-add" onPress={() => navigation.navigate('Register')} />
            </HeaderButtons>
          ),

        headerStyle: {
            backgroundColor: '#21A5EC',
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
      <View style={styles.container}>
      <Text style={styles.MyText} >Welcome</Text>
      <Text style={styles.Text} >to my application</Text>
        <TouchableHighlight style={{justifyContent: "center"}}  
            onPress={() => {
                this.props.navigation.navigate('Product');
            }}
                 underlayColor="white">

          <View style={styles.button}> 
            <Text style={styles.buttonText}><Icon name="ios-basket" size={30} color="#ffffff" /> Product</Text>
          </View>
        </TouchableHighlight>
      </View>
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

