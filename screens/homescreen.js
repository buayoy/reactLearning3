import React, { Component } from 'react';
import { ActivityIndicator,Image,FlatList,AsyncStorage,ScrollView, Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import Swiper from 'react-native-swiper'
import axios from 'axios';
import ResponsiveImage from 'react-native-responsive-image';

import Logo from '../components/logo/index'
import { Dropdown } from 'react-native-material-dropdown';
import NavIcon from '../components/NavIcon'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
// const IoniconsHeaderButton = passMeFurther => (
//     <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
//   );
const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={30} color="white" />
);
// const userlogin = this.state.user.citizen;

export default class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{
         
      },
      phone:'',
      name:'',
      checklogin:{},
      refreshing: true,
      data: [],
      loading: true,
      datacm: [],
      lastRefresh: Date(Date.now()).toString(),
      
    }
  
    this.refreshScreen = this.refreshScreen.bind(this)
      // checklogin:{}

    }
    refreshScreen() {
      this.setState({ lastRefresh: Date(Date.now()).toString() })
    }
    async getData() {
      const response = await axios.get('http://1.179.246.102/npcr_admin_api/public/api/newspr/home');
      const responsecm = await axios.get('http://1.179.246.102/npcr_admin_api/public/api/newscm/home');
      const responsetop = await axios.get('http://1.179.246.102/npcr_admin_api/public/api/newspr/get10');
  
  
      this.setState({
        data: response.data,
        datacm: responsecm.data,
        datatop: responsetop.data,
        loading: false,
  
      });
      // alert(JSON.stringify(this.state.datatop))
  
    }

    

    // const {checklogin} = this.state.user
    // this.props.navigation.setParams({
    //   checklogin
    // })
    // this.setState({checklogin: !checklogin})
  


  
 
  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing:true});
    });
  }

    
  Profile=()=>{
    
    if(this.state.user = null){
      // this.props.navigation.navigate('Profile')
      Alert.alert('null')
    }else{
      // this.props.navigation.navigate('Verify')
      Alert.alert('not null')
    };
  }
 async showPhoneData(){
  var phones = await AsyncStorage.getItem("phone");
  await this.setState({ phone: phones });
  var names = await AsyncStorage.getItem("name");
  await this.setState({ name: names });
  // Alert.alert( this.state.phone+this.state.name );
 
  }
  async showVerifyData(){
    var users = await AsyncStorage.getItem("user");
    await this.setState({ user: users });
   

    const {checklogin} = this.state.user
    this.props.navigation.setParams({
      checklogin
    })
    // InteractionManager.runAfterInteractions(() => {
    //   this.props.navigation.setParams({ checklogin: this.state.user });
    // });
    //เรียกเพื่อไปใช้
    this.setState({checklogin: checklogin})
    this.props.navigation.setParams({
      user: this.state.user
    });
  }
    static navigationOptions  = ({navigation}) => {
      const { params = {} } = navigation.state;

      // const params = navigation.getParam('checklogin')
      // this.state.user
      // alert(params)
      return {
        headerTitle: <Logo/>,
        headerLeft: ( <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}
          >
            <Item 
            title="menu" iconName="ios-exit" onPress={()=>{
              // Alert.alert('test')
              AsyncStorage.removeItem('user')
              AsyncStorage.removeItem('phone')
              AsyncStorage.removeItem('name')
              AsyncStorage.removeItem('lastname')
              AsyncStorage.removeItem('province')
              AsyncStorage.removeItem('district')
              AsyncStorage.removeItem('subdistrict')
              AsyncStorage.removeItem('village')
              // AsyncStorage.removeItem('district')
              // this.setState({refreshing: true});
              // navigation.navigate('Home')
            }}
           
            />
          </HeaderButtons>
        ),
        //<NavIcon action={() => AsyncStorage.removeItem('user')} />
           
          
          headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              {
              <Item 
              title="register" 
              iconName= {params.user != null ? 'ios-person' : 'ios-person-add'}
              //"ios-person" 
              onPress={() => params.user != null ? navigation.navigate('Profile') : navigation.navigate('Verify')} 
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
        }
      };

  // async componentDidMount() {
  //   AsyncStorage.getItem('user').then(user=>{
  //     this.setState({
  //       user:JSON.parse(user)
        
  //     })
  //     return users =user
  //   })

  //   Alert.alert(this.users.phone)
  //     // let user = AsyncStorage.getItem('user');
     

  //   // let user = await AsyncStorage.getItem('user');
  //   //   let parsed = JSON.parse(user);
  //   //   Alert.alert(JSON.stringify( parsed));
  //   // this.props.navigation.setParams({
  //   //   checklogin: !this.state.user.phone,
  //   //   // searchText: this.state.searchText,
  //   // });
  // }
     
  
  async componentDidMount() {
    this.showVerifyData()
    this.showPhoneData()
    this.getData();
    this._onRefresh();


    
  }
  
  _renderItem = ({ item }) => {

    return (

      <TouchableHighlight
        underlayColor='white'
        onPress={() => {
          this.props.navigation.push('Web', {
            id: item.id
          });
        }}>
        <View style={{ flex: 1, backgroundColor: '#FFFAF0', flexDirection: 'column', width: wp('33.3%') , borderColor: 'orange'}} >
          <Image source={{ uri: 'http://1.179.246.102/npcr_admin/public/newsdetail/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
          <Text style={styles.listtxt} numberOfLines={1} >
            {item.news_pr_name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderItem2 = ({ item }) => {

    return (
      <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'column', width: wp('33.3%') }}>
        <Image source={require('../images/region1.jpg')} resizeMode='stretch' style={styles.listpic} />
        <Text style={styles.listtxt} numberOfLines={2} >
          {item.news_cm_name}
        </Text>

      </View>

    )
  }

  _renderItem3 = ({ item }) => {

    return (

      <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'column', width: wp('33.3%') }}>

        {item.type === "pr" ? (
          <TouchableHighlight
            underlayColor='white'
            onPress={() => {
              this.props.navigation.push('Web', {
                id: item.id
              });
            }}>
            <View >
              <Image source={{ uri: 'http://1.179.246.102/npcr_admin/public/newsdetail/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
              <Text style={styles.listtxt} numberOfLines={2} >
                {item.name}
              </Text>
            </View>
          </TouchableHighlight>
        ) : (
            <View>
              <Image source={require('../images/region1.jpg')} resizeMode='stretch' style={styles.listpic} />
              <Text style={styles.listtxt} numberOfLines={2} >
                {item.name}
              </Text>
            </View>
          )}
      </View>

    )
  }


  _onRefresh = () => {
    this.setState({
      loading: true
    });
    this.getData();
  }
  render() {

    const sizeicon = wp('5.5%');
    return (

      <View style={styles.container}>

        {

          this.state.loading ? (
            <ActivityIndicator size="large" color="#006600" />
          ) : (

              <ScrollView>

                <View style={{ marginBottom: 5 }}>

                  <Swiper autoplay height={hp('25%')}
                    onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                    dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, margin: 3 }} />}
                    activeDot={<View style={{ backgroundColor: 'white', width: 5, height: 5, borderRadius: 4, margin: 3 }} />}
                    loop>
                    <View style={{ flex: 1 }}>
                      <ResponsiveImage resizeMode='stretch' style={styles.image} source={require('../images/header.png')} />
                    </View>
                    <View>
                      <ResponsiveImage resizeMode='stretch' style={styles.image} source={require('../images/region2.jpg')} />
                    </View>
                  </Swiper>
                </View>

                <View style={{ flex: 1, backgroundColor: '#FFFAF0', flexDirection: 'row' }}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ marginLeft: wp('1%') }}>
                      <Icon
                        raised
                        name='place'
                        type='Entypo'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f8bf3c' }}
                        onPress={() => this.props.navigation.navigate("Map")} />
                      <Text style={styles.centericon}>
                        จุดให้บริการ
                     </Text>
                    </View>

                    <View style={styles.lineStyleh} />
                    <View>
                      <Icon
                        raised
                        name='th'
                        type='font-awesome'
                        size={sizeicon}
                        color='white'
                        containerStyle={{ backgroundColor: '#67cbc5' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ความเป็นมา
                  </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='paper-plane-o'
                        type='font-awesome'
                        size={sizeicon}
                        color='white'
                        containerStyle={{ backgroundColor: '#739852' }}
                        onPress={() => this.props.navigation.navigate("News")} />
                      <Text style={styles.centericon}>
                        ข่าวสาร
                       </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='users'
                        type='font-awesome'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f6860c' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        กิจกรรม
                     </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='ios-megaphone'
                        type='ionicon'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f7400b' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        แจ้งปัญหา
                     </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='ios-chatboxes'
                        type='ionicon'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#ae6b51' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ถาม-ตอบ
                       </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='camera'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f8bf3c' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ท่องเที่ยว
                     </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='direction'
                        type='simple-line-icon'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#67cbc5' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ที่พัก
                     </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='food-fork-drink'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#739852' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ร้านอาหาร
                       </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='gift'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f6860c' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        แลกของขวัญ
                       </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='file-document-box-outline'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f7400b' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        แบบสอบถาม
                       </Text>
                    </View>

                    <View style={styles.lineStyleh} />

                    <View style={{ marginRight: wp('1%') }}>
                      <Icon
                        raised
                        name='file-document-box-outline'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#ae6b51' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        สื่อการเรียนรู้
                       </Text>
                    </View>

                  </ScrollView>

                </View>

                <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'row', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), marginTop: hp('1%'), marginLeft: wp('2%') , borderRadius:wp('1.5%')}}>ข่าวประชาสัมพันธ์</Text>
                </View>

                <FlatList
                  // style={{flex:1, flexDirection:'row'}}
                  scrollEnabled={false}
                  horizontal={true}
                  data={this.state.data.data}
                  renderItem={this._renderItem}
                  onRefresh={this._onRefresh}
                  refreshing={this.state.loading}
                />


                <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'row'}}>
                  <Text style={styles.headertext}>ข่าวชุมชน</Text>
                </View>

                <FlatList

                  scrollEnabled={false}
                  horizontal={true}
                  data={this.state.datacm.data}
                  renderItem={this._renderItem2}
                  refreshing={this.state.loading}
                />

                <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'row' ,  borderRadius: wp('1%') }}>
                  <Text style={styles.headertext}>ข่าว Top 10</Text>
                </View>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={this.state.datatop}
                  renderItem={this._renderItem3}
                  refreshing={this.state.loading}
                />
              </ScrollView>

            )}
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',

  },
  headertext: {
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    marginTop: hp('2%'),
    marginLeft: wp('2%')
  },
  buttonText: {
    fontSize: 20,
    padding: 20,
    color: 'white'
  },
  image: {
    width: wp('100%'), height: hp('25%')
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  lineStyleh: {
    borderWidth: 0.5,
    borderColor: '#9B9B9B',
    margin: 5,
    height: hp('10%')
  },
  centericon: {
    fontSize: wp('2.8%'),
    alignSelf: 'center',
    marginBottom: 1.5,
  },
  listpic: { 
  width: wp('31.8%'), 
  height: hp('15%'), 
  marginLeft: wp('1%'), 
  borderRadius: hp('1.5%'),
  borderWidth: 2,
  borderColor: '#F5F5DC'
  },
  listtxt: {
  marginLeft: wp('1%'),
  width: wp('31%') 
  },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

