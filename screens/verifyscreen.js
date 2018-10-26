import React, { Component } from 'react';
import {
    Image,Picker,Alert,Linking, AppRegistry, Platform, StyleSheet, Text,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
  TouchableWithoutFeedback, View ,AsyncStorage,TextInput,ScrollView
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import ValidationComponent from 'react-native-form-validator';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { FormLabel, FormInput, FormValidationMessage, Button ,Card } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/logo/index'
import { Dropdown } from 'react-native-material-dropdown';
import ImageSelecter from 'react-native-image-picker';



const width = '100%';
const IoniconsHeaderButton = passMeFurther => (
    <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
  
  );
export default class Verifyscreen extends Component {
    constructor(props){

        super(props);
        // this.mCredentail = {credentail :{phone2:this.state.phonenumber , citizen2:this.state.citizenID }}
        this.state={
            lastRefresh: Date(Date.now()).toString(),
        
        
        
          // This is our Default number value
          NumberHolder : 1 ,
          citizenID:'',
          phonenumber:'',
          text:'',
          loading: true,
          verify:'',
          email: '',
    password: '',
        }
        this.refreshScreen = this.refreshScreen.bind(this)
      
        
      }
 
      static navigationOptions  = ({navigation}) => {
        // const { params = {} } = navigation.state;
        // const params = navigation.getParam('checklogin')
        // this.state.user
        // alert(params)
        return {
          headerTitle: <Logo/>,
          headerLeft: ( <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}
            >
          //     {/* <Item 
          //     title="menu" iconName="ios-exit" 
              
          //       onPress={()=>{
          //       // Alert.alert('test')
          //       AsyncStorage.removeItem('user')
          //       AsyncStorage.removeItem('phone')
          //       AsyncStorage.removeItem('name')
          //       AsyncStorage.removeItem('lastname')
          //       AsyncStorage.removeItem('province')
          //       AsyncStorage.removeItem('district')
          //       AsyncStorage.removeItem('subdistrict')
          //       AsyncStorage.removeItem('village')
          //       // AsyncStorage.removeItem('district')
          //       // this.setState({refreshing: true});
          //       // navigation.navigate('Home')
          //     }}
               
          //     /> */}
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
        componentWillMount(){
            this.refreshScreen();
        }
 async getProfile(){
     //get access_token
        const value = await AsyncStorage.getItem('token')
        const token = JSON.parse(value)
        const access_token= token.access_token
      
    //   alert(JSON.stringify(access_token))
       //get Profile
       const response = await axios.get('https://jerawut.auth0.com/userinfo',{
        headers:{
            Authorization: "Bearer "+access_token
        }
    });
    AsyncStorage.setItem('profile',JSON.stringify(response.data));
    console.log(response.data)
  }
  _Login=async()=>{
      try{
        const response = await axios.post('https://jerawut.auth0.com/oauth/token',{
            grant_type: 'password',
            username: this.state.email,
            password: this.state.password,
            audience: 'https://jerawut.auth0.com/api/v2/',
            scope: 'openid',
            client_id: 'iMYXFZWu9GptbyQvuxcKzbjkcMh7Jm7l',
        });
        AsyncStorage.setItem('token',JSON.stringify(response.data));
        // console.log(response.data)
        this.getProfile();
        this.props.navigation.navigate('Home');
        alert(response.data)
        }catch(error){
          console.log(error);
      }
  }
  _Verify=async()=>{
      try{
       
        if(this.state.phonenumber.length == 10 && this.state.citizenID.length == 13){
        const response = await axios.post('http://1.179.246.102/npcr_admin_api/public/api/otp3/insert',{

        });
        
        AsyncStorage.setItem('text',JSON.stringify(response.data));

        let RandomNumber = Math.floor(Math.random() * 9999) + 1 ;
        this.setState({
        text : RandomNumber
        })
        
        const url = await axios.post('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&phonenumber='+this.state.phonenumber+'&text='+this.state.text+'&lang=en')
          
        
        
        //AsyncStorage.setItem(JSON.stringify(response.data));
       alert(this.state.text)
        // this.props.navigation.navigate('Otp2',{ otp: response.data });
  }else if(this.state.phonenumber.length == 10 && this.state.citizenID.length < 13){
    Alert.alert('กรอกเลขบัตรประจำตัวประชาชนให้ครบถ้วน')
  }else if(this.state.phonenumber.length < 10 && this.state.citizenID.length == 13){
    Alert.alert('กรอกเบอร์โทรศัพท์ให้ครบถ้วน')
  }else if(this.state.phonenumber.length < 10 && this.state.citizenID.length < 13){
    Alert.alert('กรอกข้อมูลให้ครบถ้วน')
  }
      }catch{

      }
  
  }
  goBack(){
      const {navigation} = this.props
      navigation.goBack()
      navigation.state.params.onBack();
  }
  
  _Register = () => {
      this.props.navigation.navigate('Register')
      
  }
  componentDidMount(){
    this.refreshScreen();
  }
 _Verify2=()=>{
   try{
  if(this.state.verify == this.state.text){
    // const {phonenumber,citizenID} = this.state
    // const response = await axios.post('http://localhost:8000/api/otp4/insert',{
    //         otp_PhoneNumber:this.state.phonenumber,
    //         otp_Text:this.state.text,
    //         otp_CitizenID:this.state.citizenID,
    //         loading :true
    //     });
      //   let obj={
      //     phone:this.state.phonenumber,
      //     citizen:this.state.citizenID
      //   }
      //   AsyncStorage.setItem('user',JSON.stringify(obj))
      //   let user = await AsyncStorage.getItem('user');
      // let parsed = JSON.parse(user)
      // Alert.alert(parsed.phone + parsed.citizen)

      // let phone = this.state.phonenumber
      // AsyncStorage.setItem('phone',JSON.stringify(phone))
      
      // let citizen = this.state.citizenID
      // AsyncStorage.setItem('citizen',JSON.stringify(citizen))
     
        // AsyncStorage.setItem('dataPhone',JSON.stringify(response.data));
    // Alert.alert(response.data)    
    // this.setState({refreshing: true});
    this.props.navigation.navigate('AddProfile', {credentail:{phone2:this.state.phonenumber , citizen2:this.state.citizenID}})
    // Alert.alert(`Phone Number : ${phonenumber} CitizenID :${citizenID}`)
    // await AsyncStorage.setItem({credentail2:{phone: phonenumber , citizen:citizenID}})

  }else{
    Alert.alert('กรอกรหัส OTP ไม่ถูกต้อง')
  }
  
}catch(error){
  console.log(error)
}

}

checkID(id)
{
if(id.length != 13) return false;
for(i=0, sum=0; i < 12; i++)
sum += parseFloat(id.charAt(i))*(13-i); if((11-sum%11)%10!=parseFloat(id.charAt(12)))
return false; return true;
}

checkForm()
{ if(!checkID(document.form1.txtID.value))
alert('รหัสประชาชนไม่ถูกต้อง');
else alert('รหัสประชาชนถูกต้อง เชิญผ่านได้');
}

refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
  }
  render() {
    
    return (
    
      <View style={styles.container}>
      <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Icon  name="ios-person-add" size={80} color="#006600"  />
      <Text style={{fontWeight:'bold', fontSize:30 ,color:'#006600',marginTop:-15,marginBottom:20}}>สมัครสมาชิก</Text>
      </View>
      <View style={{flex:1}}>
      {
        this.state.text ? (
          
          <View>
           <Card containerStyle={{padding: 0 ,borderRadius:7 , marginBottom:10 ,borderColor:'#7CFC00'}} >
          <Text style={{fontSize:20,color:'#006600',marginLeft:10,marginBottom:10 ,marginTop:10}}>ข้อมูลส่วนตัว</Text>
          <Text style={{fontSize:14,color:'#006600',marginLeft:10,marginBottom:2}}>เลขบัตรประจำตัวประชาชน: {this.state.citizenID}</Text>
          <Text style={{fontSize:14,color:'#006600',marginLeft:10}}>กรอกรหัส OTP ของหมายเลข: {this.state.phonenumber}</Text>
           <TextInput
           autoCapitalize={'none'}
           autoCorrect={false}
           style={styles.input}
            ref={verify => this.verify = verify}
            placeholder={'กรอกรหัส OTP ของ '+this.state.phonenumber}
            onChangeText={
              verify => this.setState({ verify })
            }
            
            // keyboardType='email-address'
          />
          <View style={{ flexDirection: 'column',justifyContent: 'space-around',marginBottom:20}}>
         <Button
           backgroundColor='#006600'
           // buttonStyle={{ marginTop: 30 }}
           buttonStyle={{ marginTop: 30 ,borderRadius:10  }}
          //  large
           title={'ยืนยันรหัส OTP '}
          onPress={this._Verify2}
          
           //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
         />

         <Button
           backgroundColor='#006600'
           
          //  color='#006600'
           // buttonStyle={{ marginTop: 30 }}
           buttonStyle={{ marginTop: 30 ,borderRadius:10 , borderWidth: 1 ,borderColor:'#7CFC00' }}          //  large
           title={'ขอรหัสยืนยัน OTP อีกครั้ง'}
           backgroundColor='#FFFFFF'
           color="#006600"
          onPress={this._Verify}
           //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
         />
         </View>
         </Card>
         </View>
        
        ):(
          <KeyboardAwareScrollView>
            <Card containerStyle={{padding: 0 ,borderRadius:7 , marginBottom:10,borderColor:'#7CFC00'}} >
          <Text style={styles.labelStyle}>เลขประจำตัวประชาชน</Text>
          <TextInput
            
            ref={citizenID => this.citizenID = citizenID}
            // keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            maxLength = {13}
            placeholder='กรอกเลขบัตรประจำตัวประชาชน'
            onChangeText={
                citizenID => this.setState({ citizenID })
            }
            // keyboardType='email-address'
          />
            
          <Text style={styles.labelStyle}>เบอร์โทรศัพท์</Text>
          <TextInput
           
            ref={phonenumber => (this.phonenumber = phonenumber)}
            //keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength = {10}
            style={{height: 50,
              width: '90%',
              marginTop: 10,
              marginLeft:18,
              padding: 4,
              borderRadius: 5,
              fontSize: 18,
              color:'#006600',
              borderWidth: 1,
              borderColor: '#48bbec33'}}
            placeholder="กรอกเบอร์โทรศัพท์"
            onChangeText={phonenumber => this.setState({ phonenumber })}
            // secureTextEntry={true}
          />
          
          
           <View style={{ flexDirection:'row' ,flex:1 ,justifyContent:'center' ,marginBottom:20}}>
          <Button
            backgroundColor='#006600'
            buttonStyle={{ marginTop: 30 ,borderRadius:10 ,width:110 , }}
            // large
            title='ยืนยัน'
            onPress={  this._Verify }
           
            
            //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
          /><Button
          backgroundColor='#006600'
          buttonStyle={{ marginTop: 30 ,borderRadius:10,width:110 , borderWidth: 1 ,borderColor:'#7CFC00' }}
          // large
          title='ยกเลิก'
          backgroundColor='#FFFFFF'
          color="#006600"
          onPress={()=> this.props.navigation.goBack()}
         
          
          //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
        />
         </View>
         </Card>
        </KeyboardAwareScrollView>
        
        )}
        <View style={{ flexDirection: 'row',justifyContent: 'space-around',}}>
          
          
        </View>
        </View>
      </View>


    )
      
    
    ;
  }
}



// create a component
export class AddProfile extends Component {


    static navigationOptions  = ({navigation}) => {
        // const { params = {} } = navigation.state;
        // const params = navigation.getParam('checklogin')
        // this.state.user
        // alert(params)
        return {
          headerTitle: <Logo/>,
          headerLeft: ( <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}
            >
          //     {/* <Item 
          //     title="menu" iconName="ios-exit" 
              
          //       onPress={()=>{
          //       // Alert.alert('test')
          //       AsyncStorage.removeItem('user')
          //       AsyncStorage.removeItem('phone')
          //       AsyncStorage.removeItem('name')
          //       AsyncStorage.removeItem('lastname')
          //       AsyncStorage.removeItem('province')
          //       AsyncStorage.removeItem('district')
          //       AsyncStorage.removeItem('subdistrict')
          //       AsyncStorage.removeItem('village')
          //       // AsyncStorage.removeItem('district')
          //       // this.setState({refreshing: true});
          //       // navigation.navigate('Home')
          //     }}
               
          //     /> */}
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

  state = {
     
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
      phone:this.props.navigation.state.params.credentail.phone2,
      citizen:this.props.navigation.state.params.credentail.citizen2,
      name:'',
      lastname:'',
      imageSource:null,

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
  async showData(){
    var Phone = await AsyncStorage.getItem("phone");
    await this.setState({ phone: Phone });
    var Citizen = await AsyncStorage.getItem("citizen");
    await this.setState({ citizen: Citizen});
    Alert.alert( this.state.phone + this.state.citizen );
   
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
  nameLastname=async()=>{
    const {name,lastname} = this.state
    const response = await axios.post('http://1.179.246.102/npcr_admin_api/public/api/saveuser/post',{
            lastname:this.state.lastname,
            name:this.state.name,
            otp_CitizenID:this.state.user.citizen,
            otp_PhoneNumber:this.state.user.phone,
            // otp_CitizenID:this.state.citizenID,
            loading :true
        });
    let obj={
      name:this.state.name,
      lastname:this.state.lastname
    }
    AsyncStorage.setItem('fullname',JSON.stringify(obj))
    let fullname = await AsyncStorage.getItem('fullname');
  let parsed = JSON.parse(fullname)
  Alert.alert(parsed.name + parsed.lastname)
  this.props.navigation.navigate('Home')

  }
  _SaveUser = async (event) => {
    try{
      const {name,subdistrict,village,district,province,lastname,citizen,imageSource} = this.state
      const response =  await axios.post('http://1.179.246.102/npcr_admin_api/public/api/saveuser/post', {
        save_name: this.state.name,
        save_phone: this.state.phone,
        save_citizen:this.state.citizen,
        save_lastname:this.state.lastname,
        province: this.state.province,
        district: this.state.district,
        subdistrict: this.state.subdistrict,
        village: this.state.village,
        // status: 'ยังไม่ดำเนินการ',
    });
    let obj={
      name:this.state.name,
      lastname:this.state.lastname
    }
    AsyncStorage.setItem('user',JSON.stringify(obj))
    
    let phone1 = this.state.phone
    AsyncStorage.setItem('phone',JSON.stringify(phone1))

    let name1 = this.state.name
    AsyncStorage.setItem('name',JSON.stringify(name1))

    let lastname1 = this.state.lastname
    AsyncStorage.setItem("lastname",JSON.stringify(lastname1))

    let citizen1 = this.state.citizen
    AsyncStorage.setItem('citizen',JSON.stringify(citizen1))

    let province1 = this.state.province
    AsyncStorage.setItem('province',JSON.stringify(province1))

    let district1 = this.state.district
    AsyncStorage.setItem('district',JSON.stringify(district1))

    let subdistrict1 = this.state.subdistrict
    AsyncStorage.setItem('subdistrict',JSON.stringify(subdistrict1))

    let village1 = this.state.village
    AsyncStorage.setItem('village',JSON.stringify(village1))

    let imageSource1 = this.state.imageSource
    AsyncStorage.setItem('imageSource',(imageSource1))
    const problem_id = response.data.id; // use insert id fk fileupload
    //alert(response.data.id);
    this.uploadPhoto(problem_id);
    // const saveuser_id = response.data.id;
    // this.uploadPhoto(saveuser_id);
    this.props.navigation.push('Home')
    

    Alert.alert(this.state.name+this.state.phone+this.state.citizen+this.state.lastname+this.state.province+this.state.district+this.state.subdistrict+this.state.village)
    }catch(error){
      console.log(error)
    }
   
   

}
  getparam(){
    var params = this.props.navigation.getParam("credentail")
    const {phone,citizen} = params
  }
  componentDidMount() {
    this.getData();
      // this.showData();
      this.getparam();
     
  }
  async showVerifyData(){
   
  }
 async uploadPhoto(problem_id) {
        //problem_id = 4;
        const response = await axios.post('http://1.179.246.102/npcr_admin_api/public/api/problem/upload_image?problem_id='+problem_id, {
            // problem_id: problem_id,
            imageData: this.state.imageSource.uri
        });
      
        Alert.alert(JSON.stringify(problem_id));
    }

    _SelectCameraRoll = () => {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImageSelecter.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // const source = { uri: `data:${response.data.mime};base64,` + response.data };
                // let source = { uri: response.uri };
                this.setState({
                    imageSource: {
                        uri: 'data:image/jpeg;base64,' + response.data,
                    }
                });
                //alert(this.state.imageSource.uri);
                //this.uploadPhoto();
            }
        });
    };
  render() {
      return (
       
          <View style={styles.container}>
        
              <Text style={styles.welcome}><Icon name="ios-person" size={40} color='#00802b' />เพิ่มข้อมูลส่วนตัว</Text>
              {/* <Text style={styles.welcome}><Icon name="ios-megaphone" size={40} color='#00802b' /></Text> */}
              <View style = {styles.lineStylew1} />
              <View style = {styles.lineStylew2} />
              {this.state.neme ? (
              <KeyboardAwareScrollView>
                  
                  {/* <View style = {styles.lineStylew3} /> */}
                  <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      2. เลือกจังหวัด
                  </FormLabel>
                  <Dropdown
                      containerStyle={{margin: 15,marginBottom: -10,marginTop: -10 ,borderColor: 'grey', borderTop: 1 ,borderRadius: 5 }}
                      label=''
                      ref={province => this.province = province}
                      data={this.state.getprovince}
                      onChangeText={
                          // province => this.setState({ province });
                          (itemValue, itemIndex) => this.getDistrict(itemValue)
                      }
                  />
                  <View style={this.state.hide ? {position: 'absolute', top: -200} : {}}>
                  <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      3. เลือกอำเภอ
                  </FormLabel>
                  <Dropdown
                      containerStyle={{margin: 15,marginBottom: -10,marginTop: -10 ,borderColor: 'grey', borderTop: 1 ,borderRadius: 5 }}
                      label=''
                      ref={district => this.district = district}
                      data={this.state.getdistrict}
                      onChangeText={
                          (itemValue, itemIndex) => this.getSubDistrict(itemValue)
                      }
                  />
                  <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      4. เลือกตำบล
                  </FormLabel>
                  <Dropdown
                      containerStyle={{margin: 15,marginBottom: -10,marginTop: -10 ,borderColor: 'grey', borderTop: 1 ,borderRadius: 5 }}
                      label=''
                      ref={subdistrict => this.subdistrict = subdistrict}
                      data={this.state.getsubdistrict}
                      onChangeText={
                          (itemValue, itemIndex) => this.getVillage(itemValue)
                      }
                  />
                  <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      5. เลือกหมู่บ้าน
                  </FormLabel>
                  <Dropdown
                      containerStyle={{margin: 15,marginBottom: -10,marginTop: -10 ,borderColor: 'grey', borderTop: 1 ,borderRadius: 5 }}
                      label=''
                      ref={village => this.village = village}
                      data={this.state.getvillage}
                      onChangeText={
                          village => this.setState({ village })
                      }
                  />
                  </View>
                  <View style = {styles.lineStylew3} />
                 
                  {/* <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      7. เบอร์ติดต่อกลับ
                  </FormLabel>
                  <FormInput
                      inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1 ,borderRadius: 5 }}
                      ref={email => this.email = email}
                      placeholder=''
                      onChangeText={
                          email => this.setState({ email })
                      }
                      keyboardType='email-address'
                  /> */}
                  <View style={styles.setpositionbutton}>
                      <Button
                          backgroundColor='#00802b'
                          buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b' ,borderRadius: 5 ,marginLeft: -2.5 ,marginRight: -2.5}}
                          // icon={{ name: 'person', type: 'font-person' }}
                          title='ยืนยัน'
                          onPress={this._SaveUser}
                      />
                      <Button
                          backgroundColor='#ffff'
                          buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b' ,borderRadius: 5 ,marginLeft: -2.5 ,marginRight: -2.5}}
                          // icon={{ name: 'person', type: 'font-person' }}
                          title='ยกเลิก'
                          color="#00802b"
                          onPress={() => {
                              this.props.navigation.navigate("Report_btn_step_2");
                          }}
                      />
                  </View>
              </KeyboardAwareScrollView>):(
                <View>
                  <KeyboardAwareScrollView>
            <Card containerStyle={{padding: 0 ,borderRadius:7 , marginBottom:100,borderColor:'#7CFC00'}} >
            {/* <TextInput
            
            ref={name => this.name = name}
            // keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            maxLength = {13}
            placeholder='กรอกชื่อจริง'
            onChangeText={ name => this.setState({ name })}
            // keyboardType='email-address'
          /> */}
          {/* <Text style={styles.labelStyle}>{this.state.user.phone}</Text> */}
<Text style={styles.labelStyle}>หมายเลขโทรศัพท์ {this.state.phone}</Text>
<Text style={styles.labelStyle}>เลขบัตรประจำตัวประชาชน {this.state.citizen}</Text>
{/* <Text style={styles.labelStyle}>params  {this.state.phone}</Text> */}


          <Text style={styles.labelStyle}>ชื่อจริง</Text>
          <TextInput
            
            ref={name => this.name = name}
            // keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            maxLength = {60}
            placeholder='กรอกชื่อจริง'
            onChangeText={ name => this.setState({ name })}
            // keyboardType='email-address'
          />
            
          <Text style={styles.labelStyle}>นามสกุล</Text>
          <TextInput
            ref={lastname => (this.lastname = lastname)}
            //keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength = {60}
            style={styles.input}
            placeholder="กรอกนามสกุล"
             onChangeText={lastname => this.setState({ lastname })}
            // secureTextEntry={true}
          />
             
                  {/* <View style = {styles.lineStylew3} /> */}
                  <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      เลือกจังหวัด
                  </FormLabel>
                  <Dropdown
                      containerStyle={{margin: 15,marginBottom: -10,  marginTop: -10 ,borderColor: 'grey', borderTop: 1 ,borderRadius: 5 }}
                      label=''
                      
                      ref={province => this.province = province}
                      data={this.state.getprovince}
                      onChangeText={
                          // province => this.setState({ province });
                          (itemValue, itemIndex) => this.getDistrict(itemValue)
                      }
                  />
                  <View style={this.state.hide ? {position: 'absolute', top: -200} : {}}>
                  <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      เลือกอำเภอ
                  </FormLabel>
                  <Dropdown
                      containerStyle={{margin: 15,marginBottom: -10,marginTop: -10 ,borderColor: 'grey', borderTop: 1 ,borderRadius: 5 }}
                      label=''
                      ref={district => this.district = district}
                      data={this.state.getdistrict}
                      onChangeText={
                          (itemValue, itemIndex) => this.getSubDistrict(itemValue)
                      }
                  />
                  <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      เลือกตำบล
                  </FormLabel>
                  <Dropdown
                      containerStyle={{margin: 15,marginBottom: -10,marginTop: -10 ,borderColor: 'grey', borderTop: 1 ,borderRadius: 5 }}
                      label=''
                      ref={subdistrict => this.subdistrict = subdistrict}
                      data={this.state.getsubdistrict}
                      onChangeText={
                          (itemValue, itemIndex) => this.getVillage(itemValue)
                      }
                  />
                  <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      เลือกหมู่บ้าน
                  </FormLabel>
                  <Dropdown
                      containerStyle={{margin: 15,marginBottom: -10,marginTop: -10 ,borderColor: 'grey', borderTop: 1 ,borderRadius: 5 }}
                      label=''
                      ref={village => this.village = village}
                      data={this.state.getvillage}
                      onChangeText={
                          village => this.setState({ village })
                      }
                  />
                  </View>
                  <View style = {styles.lineStylew3} />
                  
                  {/* <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                      7. เบอร์ติดต่อกลับ
                  </FormLabel>
                  <FormInput
                      inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1 ,borderRadius: 5 }}
                      ref={email => this.email = email}
                      placeholder=''
                      onChangeText={
                          email => this.setState({ email })
                      }
                      keyboardType='email-address'
                  /> */}
                   <Button
                        backgroundColor='#00802b'
                        buttonStyle={{ marginTop: 20, borderRadius: 5 }}
                        icon={{ name: 'camera', type: 'font-camera' }}
                        title='เพิ่มรูปภาพ'
                        onPress={this._SelectCameraRoll}
                    />
                    <View style={{alignItems:'center'}}>
                        { this.state.imageSource === null ? <Text></Text> :
                            <Image style={styles.avatar} source={this.state.imageSource} />
                        }
                    </View>
                  <View style={styles.setpositionbutton}>
                      <Button
                          backgroundColor='#00802b'
                          buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b' ,borderRadius: 5 ,marginLeft: -2.5 ,marginRight: -2.5}}
                          // icon={{ name: 'person', type: 'font-person' }}
                          title='ยืนยัน'
                          onPress={this._SaveUser}
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
                  
          
           <View style={{ flexDirection:'row' ,flex:1 ,justifyContent:'center' ,marginBottom:10}}>
          
         </View>

         </Card>

        </KeyboardAwareScrollView>

        </View>
              )}
          </View>
      );
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    // marginLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
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
lineStylew3:{
  borderWidth: 0.5,
  borderColor:'#9B9B9B',
  backgroundColor: '#9B9B9B',
  marginTop: 20,  
  alignSelf: 'center',
  width: '93%',
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
avatar: {
    //borderRadius: 75,
    margin: 10,
    marginLeft: 15,
    width: 150,
    height: 150
  }
});