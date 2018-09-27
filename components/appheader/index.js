//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Image } from 'react-native';

// create a component
class AppHeader extends Component {
    HeaderRender(){
        return (
            <View style={{flex:1,backgroundColor: '#105B2F'}}>
                <Image style={{ width: '100%', height: 90, resizeMode: 'contain', marginTop: 40, marginBottom: 40 }} source={require('../img/header.png')} />
            </View>
        )
    }
    render() {
        return (
            <View style={{flex:0.15,justifyContent:'flex-start'}}>
            <FlatList  
            ListHeaderComponent={this.HeaderRender}/>
                <Text style={styles.title}>ยินดีต้อนรับ</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    title:{
        fontSize:40
    },
    FlatListStyle:{ paddingLeft: 28, paddingRight: 28 }

});

//make this component available to the app
export default AppHeader;
