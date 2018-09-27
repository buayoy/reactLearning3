import React, { Component } from 'react';

import {
  Alert, AppRegistry, Platform, StyleSheet, Text,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
  TouchableWithoutFeedback, View,ScrollView
} from 'react-native';

import {Divider, List, ListItem, Card, Button } from 'react-native-elements'
import axios from 'axios';

export default class DetailScreen extends Component {
  state = {
    data: [],
  }
  static navigationOptions =({navigation}) =>({
    title: navigation.getParam('title',''),
    headerStyle: {
      backgroundColor: '#006600',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });


  //ฟังก์ชันดึงข้อมูล
  async getData(id) {
    const response = await axios.get('https://codingthailand.com/api/get_course_detail.php', {
      params: {
        course_id: id
      }
    });
    this.setState({
      data: response.data,
    })
    //alert(JSON.stringify(response.data))
  }

  //รับพารามิเตอร์จากหน้า ProductScressn
  componentDidMount() {
    const id = this.props.navigation.getParam('id', 0);
    this.getData(id);
  }

  render() {
    return (
      <ScrollView>
      <Card containerStyle={{ padding: 0 }} >
      <Divider style={{ backgroundColor: 'blue' }} />

        {
          this.state.data.map((u, i) => {
            return (
              <ListItem
                key={i}
                title={u.ch_title}
              />
            );
          })
        }
      </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
  }
});