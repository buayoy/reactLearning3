import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomePage extends Component {


  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.props.navigation.setParams({ increaseCount: (this.increaseCount) });
  }

  increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };


  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'HOME',
      headerRight: (<Button title="Info" color="white" onPress={params.increaseCount} />)
    }
  }



  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', }}>
        <Image resizeMode='center' style={{ width:300,height:70,marginTop:20  }} source={require('./img/logo.png')} />
        <Text> Home page {this.state.count}</Text>
        <Button title="Push" onPress={() => this.props.navigation.push('Detail', this.params)} />

      </View>
    );
  }
}



const RootStack = StackNavigator({
  Home: {
    screen: HomePage
  }
}, {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#105B2F'
      },
      headerTintColor: '#FFFFFF'
    }
  })


class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}



export default App;
