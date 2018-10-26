import React, { Component } from 'react';
import { Alert,ActivityIndicator, AppRegistry, Platform, StyleSheet, Text,FlatList, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import axios from "axios";
import { List, ListItem } from 'react-native-elements';
import { FormLabel,SearchBar, FormInput, FormValidationMessage ,Card } from 'react-native-elements'
import Logo from '../components/logo/index';

export default class Productscreen extends Component {

  state={
    data:[],
    loading: true
  }
    static navigationOptions = {
        title: 'Product',
      };

  _onPressButton() {
    Alert.alert('Wait')
  }
  _onRefresh(){
    this.setState({
      loading:true
    });
    this.getData();
  }
  async getData(){
    const response = await axios.get('https://codingthailand.com/api/get_courses.php')
    this.setState({
      data: response.data,
      loading:false
    });
  }
  componentDidMount(){
    this.getData();
  }
  renderHeader = () => {    
    return (      
      <SearchBar
      round
      searchIcon={{ size: 24 }}
      onChangeText={this.response.data}
      // onClear={''}
      placeholder='Type Here...' />
    );  
  };
  
  _renderItem = ({item}) =>{
    return (
      <ListItem
      roundAvatar
      title={item.c_title}
      subtitle={item.c_detail}
      hideChevron={false}
      onPress={()=>{
        this.props.navigation.navigate('Detail',{id:item.id,title: item.c_title})
        
      }}
      // avatar={{uri:item.avatar_url}}
    />
    )};
  render() {

    return (
      <View>
      {
        this.state.loading ? (
          <ActivityIndicator size="small" color="#00ff00"  />
        ):(
          <List containerStyle={{marginTop:0}}>
        
          <FlatList
          // renderHeader={this.renderHeader}
          data={this.state.data}
          ListHeaderComponent={this.renderHeader}
          // extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          onRefresh={()=>{this._onRefresh()}}
          refreshing={this.state.loading}
        />
        
        </List>
)
      }
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
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});


// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

