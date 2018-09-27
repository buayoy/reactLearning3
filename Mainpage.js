/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, ImageBackground, StyleSheet, FlatList, View, Button, Alert, Text, TouchableHighlight, Image } from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
//flex-box
/**
 * flex:
 */
export default class Workshop15 extends Component {
    // render() {
    //   return (
    //     <View style={styles.container}>
    //       <Text style={styles.welcome}>Palm to React Native!</Text>
    //       <Text style={styles.instructions}>To get started, edit App.js</Text>
    //       <Text style={styles.instructions}>{instructions}</Text>
    //     </View>
    //   );
    // }
    constructor(props) {
        super(props)
        this.state = { active: false }

    }


    renderListHeader() {

        return (
            <View style={{marginTop: 20,flex:1,backgroundColor: '#105B2F'}}>
                <Image style={{ width: '100%', height: 90, resizeMode: 'contain', marginTop: 40, marginBottom: 40 }} source={require('./img/header.png')} />
            </View>
        )
    }
    renderItem(item) {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#105B2F', marginBottom: 20, borderRadius: 7 }}>
                <View style={{ flexDirection: 'row', margin: 16, }}>
                    <Image source={require('./img/1536310985947.jpg')} style={styles.ProfilePic} />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{ color: "#FFFFFF" }}>Title</Text>
                        <Text>SubTitle</Text>
                    </View>
                </View>
                <Image source={require('./img/1536310985947.jpg')} style={{ width: '100%', height: 250 }} />

            </View>
        )
    }
    renderItem
    render() {
        return (
            <View>
                 <FlatList style={{marginBottom:10}}
                ListHeaderComponent={this.renderListHeader}
                                                                          />
                <FlatList
                    style={styles.FlatListStyle} data={[1, 2, 3, 4]}
                    renderItem={({ item }) => this.renderItem(item)} />


            </View>
        );
    }
}
const styles= StyleSheet.create({
    ProfilePic:{ width: 45, height: 45, borderRadius: (45 / 2) },
    FlatListStyle:{ paddingLeft: 28, paddingRight: 28 }



})
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         backgroundColor: '#FFFFFF',
//         justifyContent: 'flex-start',
//     },
//     myText:{
//         width:100,
//         height:100,
//         backgroundColor:'#105B2F'
//     },
//     item: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: '#FFFFFF'
//     }

// })

// class BlinkText extends Component {
//   constructor (props){
//     super(props)
//     this.state = {isVisible: true};
//     setInterval(()=>{
//       this.setState(oldState=>{
//         return {isVisible: !oldState.isVisible}
//       })

//     }, this.props.interval)

//   }
//   render() {

//     return (
//      <View style={styles.container}>
//        <Text style={styles.item}>test</Text>
//      </View>

//     );
//   }
// }
// const styles = StyleSheet.create({
//   container:{
//     flex:1,flexDirection: 'column',
//     backgroundColor: '#FF0000',
//     alignItems:'center',
//     justifyContent:'center'

//   },
//   item:{
//     fontSize:30,
//     fontWeight:'bold',
//     color:"#00FF00",

//   }
// })


