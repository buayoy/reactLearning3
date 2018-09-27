import React, { Component } from 'react';
import { WebView, Image, ActivityIndicator, Alert, AppRegistry, FlatList, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import axios from "axios";
import { Divider, List, ListItem, Card, Button } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Newscreen extends Component {

  state = {
    data: {},
    articles: [],
    totalResults: 0,
    loading: true,
    customStyleIndex: 0
  }
  static navigationOptions = {
    title: 'News',
  };
  async getData() {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=th&apiKey=b2bb00c9b3604027a2c2531fd7f95f86')
    this.setState({
      data: response.data,
      articles: response.data.articles,
      totalResults: response.data.totalResults,
      loading: false
    });
    // alert(JSON.stringify(this.state.totalResults));
  }
  componentDidMount() {
    this.getData();
  }
  handleCustomIndexSelect = (index) => {
    this.setState({
      ...this.state,
      customStyleIndex: index,
    });
  }


  _renderItem = ({ item }) => {
    //
    let urlToImage = (item.urlToImage !== null) ? item.urlToImage : 'http://logo-th.com/wp-content/uploads/2018/08/M-150.jpg'
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#87CEEB', marginBottom: 2, borderRadius: 7 }}>

        <TouchableHighlight
          underlayColor='#FFFFFF'
          onPress={() => {
            this.props.navigation.navigate('Web', { url: item.url })
          }}>
          <View style={{ flexDirection: 'row', margin: 16, }}>
            <Image source={{ uri: urlToImage }} style={{ width: 150, height: 100, marginRight: 10, borderRadius: (45 / 2) }} />
            <View style={{ flexDirection: 'row', }}>
              <Text style={{ fontSize: 20, alignSelf: 'center' }}>{item.title}</Text>

            </View>

          </View>
        </TouchableHighlight>

      </View>
    )
  };
  _onRefresh = () => {
    this.setState({
      loading: true
    });
    this.getData();
  }
  render() {
    return (
      <View >
        <SegmentedControlTab
          values={['ข่าวประชาสัมพันธ์', 'ข่าวชุมชน', 'ข่าวสารของฉัน']}
          selectedIndex={this.state.customStyleIndex}
          onTabPress={this.handleCustomIndexSelect}
          borderRadius={0}
          tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
          tabStyle={{ borderRadius: (2), backgroundColor: '#F2F2F2', borderWidth: 0, borderColor: 'transparent' }}
          activeTabStyle={{ backgroundColor: '#21A5EC', marginBottom: 2 }}
          tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
          activeTabTextStyle={{ color: '#FFFFFF' }} />
        {this.state.customStyleIndex === 0 &&
          <View>{this.state.loading ? (
            <ActivityIndicator size="small" color="#00ff00" />
          ) : (<FlatList
            style={styles.FlatListStyle}
            data={this.state.articles}
            // extraData={this.state}
            keyExtractor={item => item.title}
            renderItem={this._renderItem}
            onRefresh={this._onRefresh}
            refreshing={this.state.loading}
          />)
          }</View>
        }
        {this.state.customStyleIndex === 1 &&
          <Text style={styles.tabContent} > Tab two</Text>}
        {this.state.customStyleIndex === 2 &&
          <Text style={styles.tabContent} > Tab Treeeeee</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 10
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  tabContent: {
    color: '#444444',
    fontSize: 18,
    margin: 24
  },
  tabTextStyle: {
    color: '#D52C43'
  },

  FlatListStyle: { paddingLeft: 5, paddingRight: 5 }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

