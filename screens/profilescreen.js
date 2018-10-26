import React, { Component } from 'react';
import { Image,AsyncStorage,Alert,TextInput, AppRegistry,Picker, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
// import { FormLabel, FormInput, FormValidationMessage, Button ,Card } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Logo from '../components/logo/index'
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormLabel, FormInput, FormValidationMessage ,Button,Card } from 'react-native-elements'
import axios from 'axios';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
);


export default class Profilescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      problemname: '',
      problemdetail: '',
      province: '',
      district: '',
      subdistrict: '',
      village: '',
      getprovince: [],
      getdistrict: [],
      getsubdistrict: [],
      getvillage: [],
      hide: false,
      user:{},
      phone:'',
      citizen:'',
      name:'',
      lastname:''
  }
  }
  // state = {user: ''}
  // updateUser = (user) =>{
  //    this.setState({ user: user })
  // }
  static navigationOptions  = ({navigation}) => {
    // const { params = {} } = navigation.state;
    // const params = navigation.getParam('checklogin')
    // this.state.user
    // alert(params)
    return {
      headerTitle: <Logo/>,
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          {
          <Item 
          title="edit"
          iconName="edit" 
          onPress={() => navigation.navigate('EditProfile')} 
          />
          }
        </HeaderButtons>
      ),
      //<NavIcon action={() => AsyncStorage.removeItem('user')} />
         
        
        // headerRight: (
        //   <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        //     {
        //     <Item 
        //     title="register" 
        //     iconName= 'ios-create'
        //     //"ios-person" 
        //     onPress={() => navigation.navigate('EditProfile')} 
        //     />
        //     }
        //   </HeaderButtons>
        // ),
          
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

    async getuser(){
        var phones = await AsyncStorage.getItem("phone");
        phones = phones.substring(1, phones.length - 1);
        await this.setState({ phone: phones });

        var citizens = await AsyncStorage.getItem("citizen");
        citizens = citizens.substring(1, citizens.length - 1);
        await this.setState({ citizen: citizens });

        var names = await AsyncStorage.getItem("name");
        names = names.substring(1, names.length - 1);
        await this.setState({ name: names });

        var lastnames = await AsyncStorage.getItem("lastname");
        lastnames = lastnames.substring(1, lastnames.length - 1);
        await this.setState({ lastname: lastnames });

        var provinces = await AsyncStorage.getItem("province");
        provinces = provinces.substring(1, provinces.length - 1);
        await this.setState({ province: provinces });

        var districts = await AsyncStorage.getItem("district");
        districts = districts.substring(1, districts.length - 1);
        await this.setState({ district: districts });

        var villages = await AsyncStorage.getItem("village");
        villages = villages.substring(1, villages.length - 1);
        await this.setState({ village: villages });

        var subdistricts = await AsyncStorage.getItem("subdistrict");
        subdistricts = subdistricts.substring(1, subdistricts.length - 1);
        await this.setState({ subdistrict: subdistricts });
       

    

   
      }
  componentDidMount(){
    this.getuser();
  }
  render() {
   

    return (
      <View style={styles.container}>

              <Image source={require('../img/profilepic.jpg')} resizeMode='stretch' style={{ justifyContent:'flex-start', width: wp('100%'), height: hp('20%') , marginLeft: wp('0%') , borderRadius: hp('0%')}} />
              <TouchableHighlight style={{ marginTop:wp('-15%') , marginLeft:wp('7%') }}>
              <Image style={ styles.image } source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
              
              </TouchableHighlight>

              
              <Text style={{fontSize:20,marginTop:wp('-15%'),marginLeft: wp('40%'),color:'#006600',fontWeight:'bold'}}>{this.state.name} {this.state.lastname}</Text>
      <View style={{marginTop:wp('15%')}}>
      <View>
      <Text style={styles.labelstyle}>ชื่อสกุล</Text><Text style={styles.fontstyle}>{this.state.name} {this.state.lastname}</Text>
      <View style={styles.lineStylew3}/>
      </View>

      <Text style={styles.labelstyle}>เลขบัตรประจำตัวประขาชน</Text><Text style={styles.fontstyle}>{this.state.citizen}</Text>
      <View style={styles.lineStylew3}/>

      <Text style={styles.labelstyle}>หมู่บ้าน</Text><Text style={styles.fontstyle}>{this.state.village}</Text>
      <View style={styles.lineStylew3}/>

      <Text style={styles.labelstyle}>ตำบล</Text><Text style={styles.fontstyle}>{this.state.subdistrict}</Text>
      <View style={styles.lineStylew3}/>

      <Text style={styles.labelstyle}>อำเภอ</Text><Text style={styles.fontstyle}>{this.state.district}</Text>
      <View style={styles.lineStylew3}/>

      <Text style={styles.labelstyle}>จังหวัด</Text><Text style={styles.fontstyle}>{this.state.province}</Text>
      <View style={styles.lineStylew3}/>

      <Text style={styles.labelstyle}>เบอร์โทรศัพท์</Text><Text style={styles.fontstyle}>{this.state.phone}</Text>
      <View style={styles.lineStylew3}/>

      </View>
      <Button onPress={()=>{this.props.navigation.goBack()}}/>
      </View>
      
    );
  }
}
export class EditProfilescreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      problemname: '',
      problemdetail: '',
      province: '',
      district: '',
      subdistrict: '',
      village: '',
      getprovince: [],
      getdistrict: [],
      getsubdistrict: [],
      getvillage: [],
      hide: false,
      user:{},
      phone:'',
      citizen:'',
      name:'',
      lastname:''
    }
  }
  
_Postproblem = async () => {
  const response = await axios.post('http://1.179.246.102/npcr_admin_api/public/api/saveuser/post', {
      problemname: this.state.problemname,
      problemdetail: this.state.problemdetail,
      province: this.state.province,
      district: this.state.district,
      subdistrict: this.state.subdistrict,
      village: this.state.village,
  });

  if (response.data.status === 'ok') {
      Alert.alert('ผลการทำงาน', response.data.message, [{ text: 'ตกลง' }]);
  } else {
      Alert.alert('ผลการทำงาน', response.data.message, [{ text: 'ตกลง' }]);
  }

}
  // state = {user: ''}
  // updateUser = (user) =>{
  //    this.setState({ user: user })
  // }
  static navigationOptions  = ({navigation}) => {
    // const { params = {} } = navigation.state;
    // const params = navigation.getParam('checklogin')
    // this.state.user
    // alert(params)
    return {
      headerTitle: <Logo/>,
     
      //<NavIcon action={() => AsyncStorage.removeItem('user')} />
         
        
        // headerRight: (
        //   <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        //     {
        //     <Item 
        //     title="register" 
        //     iconName= 'ios-create'
        //     //"ios-person" 
        //     onPress={() => navigation.navigate('EditProfile')} 
        //     />
        //     }
        //   </HeaderButtons>
        // ),
          
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
    

    
     SaveUser=()=>{
        
    let province1 = this.state.province
    AsyncStorage.setItem('province',JSON.stringify(province1))

    let district1 = this.state.district
    AsyncStorage.setItem('district',JSON.stringify(district1))

    let subdistrict1 = this.state.subdistrict
    AsyncStorage.setItem('subdistrict',JSON.stringify(subdistrict1))

    let village1 = this.state.village
    AsyncStorage.setItem('village',JSON.stringify(village1))

    this.props.navigation.navigate('Home')
      }

    async getData() {
      const response = await axios.get('http://1.179.246.102/npcr_admin_api/public/api/problem/getprovince');
      this.setState({ getprovince: response.data });
      // alert(JSON.stringify(response.data));
  }

  async getDistrict(itemValue){
      const response = await axios.get('http://1.179.246.102/npcr_admin_api/public/api/problem/getdistrict/'+itemValue);
      this.setState({ province: itemValue,
                      getdistrict: response.data  
      });
      // Alert.alert(itemValue);  
  }

  async getSubDistrict(itemValue){
      const response = await axios.get('http://1.179.246.102/npcr_admin_api/public/api/problem/getsubdistrict/'+itemValue);
      this.setState({ district: itemValue,
                      getsubdistrict: response.data 
      });
      // Alert.alert(itemValue);
  }

  async getVillage(itemValue){
      const response = await axios.get('http://1.179.246.102/npcr_admin_api/public/api/problem/getvillage/'+itemValue);
      this.setState({ subdistrict: itemValue,
                      getvillage: response.data 
      });
      // Alert.alert(itemValue);
  }
  async getuser(){

    var phones = await AsyncStorage.getItem("phone");
    phones = phones.substring(1, phones.length - 1);
    await this.setState({ phone: phones });
  
    var citizens = await AsyncStorage.getItem("citizen");
    citizens = citizens.substring(1, citizens.length - 1);
    await this.setState({ citizen: citizens });
  
    var names = await AsyncStorage.getItem("name");
    names = names.substring(1, names.length - 1);
    await this.setState({ name: names });
  
    var lastnames = await AsyncStorage.getItem("lastname");
    lastnames = lastnames.substring(1, lastnames.length - 1);
    await this.setState({ lastname: lastnames });
  
    var provinces = await AsyncStorage.getItem("province");
    provinces = provinces.substring(1, provinces.length - 1);
    await this.setState({ province: provinces });
  
    var districts = await AsyncStorage.getItem("district");
    districts = districts.substring(1, districts.length - 1);
    await this.setState({ district: districts });
  
    var villages = await AsyncStorage.getItem("village");
    villages = villages.substring(1, villages.length - 1);
    await this.setState({ village: villages });
  
    var subdistricts = await AsyncStorage.getItem("subdistrict");
    subdistricts = subdistricts.substring(1, subdistricts.length - 1);
    await this.setState({ subdistrict: subdistricts });

  }

componentDidMount(){
  this.getuser();
  this.getData();
 
}

  render() {
   

    return (
      
        <ScrollView style={styles.container}>
              <Image source={require('../img/profilepic.jpg')} resizeMode='stretch' style={{ justifyContent:'flex-start', width: wp('100%'), height: hp('20%') , marginLeft: wp('0%') , borderRadius: hp('0%')}} />
              <Text style={{fontSize:20,marginTop:wp('4%'),marginLeft: wp('41%'),color:'#006600',fontWeight:'bold'}}>{this.state.name} {this.state.lastname}</Text>
              <TouchableHighlight style={{ marginTop:wp('-27%') , marginLeft:wp('7%') }}>
              <Image style={ styles.image } source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
              
              </TouchableHighlight>

              <TouchableOpacity
       style={{
       borderWidth:1,
       borderColor:'#739852',
       alignItems:'center',
       justifyContent:'center',
       width:50,
       height:50,
       backgroundColor:'#739852',
       borderRadius:100,
       marginLeft:wp('28%'),
       marginTop:wp('-12%')
     }}
 >
   <Icon name={"image"}  size={30} color="#FFFFFF" />
 </TouchableOpacity>
 <Button onPress={()=>{ this.props.navigation.goBack()}}/>
              <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        เลือกจังหวัด
                    </FormLabel>
                    <Dropdown
                        containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                        label=''
                        ref={province => this.province = province}
                        data={this.state.getprovince}
                        onChangeText={
                            // province => this.setState({ province });
                            (itemValue, itemIndex) => this.getDistrict(itemValue)
                        }
                    />
                    <View style={this.state.hide ? { position: 'absolute', top: -200 } : {}}>
                        <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                            เลือกอำเภอ
                    </FormLabel>
                        <Dropdown
                            containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                            label=''
                            ref={district => this.district = district}
                            data={this.state.getdistrict}
                            onChangeText={
                                (itemValue, itemIndex) => this.getSubDistrict(itemValue)
                            }
                        />
                        <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                          เลือกตำบล
                    </FormLabel>
                        <Dropdown
                            containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                            label=''
                            ref={subdistrict => this.subdistrict = subdistrict}
                            data={this.state.getsubdistrict}
                            onChangeText={
                                (itemValue, itemIndex) => this.getVillage(itemValue)
                            }
                        />
                        <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                            เลือกหมู่บ้าน
                    </FormLabel>
                        <Dropdown
                            containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                            label=''
                            ref={village => this.village = village}
                            data={this.state.getvillage}
                            onChangeText={
                                village => this.setState({ village })
                            }
                        />
                    </View>
                    <View style={styles.setpositionbutton}>
                      <Button
                          backgroundColor='#00802b'
                          buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b' ,borderRadius: 5 ,marginLeft: -2.5 ,marginRight: -2.5}}
                          // icon={{ name: 'person', type: 'font-person' }}
                          title='ยืนยัน'
                          onPress={this.SaveUser}
                      />
                      <Button
                          backgroundColor='#ffff'
                          buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b' ,borderRadius: 5 ,marginLeft: -2.5 ,marginRight: -2.5}}
                          // icon={{ name: 'person', type: 'font-person' }}
                          title='ยกเลิก'
                          color="#00802b"
                          onPress={() => {
                              this.props.navigation.navigate("Home");
                          }}
                      />
                  </View>
          

      </ScrollView>
      
      );
  }
}
const data = [
  {value: 'Banana',}, 
  {value: 'Mango',},
  {value: 'Pear',},
  {value:'test'}
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  },
  buttonText: {
    padding: 20,
    color: 'black'
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
 },
 lineStylew3: {
  borderWidth: 0.5,
  borderColor: '#9B9B9B',
  backgroundColor: '#9B9B9B',
  // marginTop: 20,
  alignSelf: 'center',
  width: '93%',
},
fontstyle:{
  marginLeft: wp('60%'),
  fontSize:16,
  color:'#006600'
},
labelstyle:{
  marginLeft: wp('5%'),
  fontSize:18,
  marginBottom:-15,
  fontWeight:'bold',
  color:'#006600'
},input: 
{
  height: 50,
  width: '90%',
  marginTop: 10,
  marginLeft:18,
  // marginBottom:10,
  padding: 4,
  borderRadius: 5,
  fontSize: 18,
  color:'#006600',
  borderWidth: 1,
  borderColor: '#48bbec33'
},
labelStyle:{
fontSize:18,
color:'#006600',
marginLeft:20,
marginTop:10
},

welcome: {
fontSize: 20,
textAlign: 'center',
margin: 15,
marginBottom: -20,
color: '#00802b',
},
setpositionbutton: {
// flex:1,
flexDirection:'row',
alignItems:'center',
marginTop: -10,
margin: 20,
justifyContent:'center',
},
setpositiontextafterbutton: {
flex: .2,
flexDirection:'row',
fontSize: 26,
textAlign: 'center',
marginTop: 45,
marginBottom: 45,
color: '#00802b',
},
setpositiontextbeforebutton: {
flexDirection:'row',
fontSize: 20,
textAlign: 'center',
margin: 20,
color: '#00802b',
},
lineStyleh:{
borderWidth: 0.5,
borderColor:'#9B9B9B',
margin: 15,
marginTop: -2,  
height: 250
},
lineStylew1:{
borderWidth: 1,
borderColor:'#00802b',
backgroundColor: '#00802b',
marginTop: 40,  
width,
},
lineStylew2:{
borderWidth: 2,
borderColor:'#00802b',
backgroundColor: '#00802b',
marginTop: 3,  
width,
},
button: {
margin: 10,
marginTop: -50,
height: 160,
width: 160,
alignItems: 'center',
backgroundColor: '#A5E65A',
borderRadius: 80,
},
buttonText: {
padding: 40,
color: 'white'
},
circle:{
  borderWidth:1,
  borderColor:'rgba(0,0,0,0.2)',
  alignItems:'center',
  justifyContent:'center',
  width:100,
  height:100,
  backgroundColor:'#fff',
  borderRadius:100,
},
imageContainer: {
  height:128,
  width: 128,
  borderRadius: 64
},
image: {
  height:128,
  width: 128,
  borderRadius: 64
},
});
const width = '100%';
 

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

