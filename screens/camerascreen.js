import React, { Component } from 'react';
import axios from 'axios';

import {
    Alert, AppRegistry, Platform, StyleSheet, Text,
    TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
    TouchableWithoutFeedback, View, Image
} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';

export default class CameraScreen extends Component {

    static navigationOptions = {
        title: 'Camera',
        headerStyle: {
            backgroundColor: '#006600',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        image: {}
    }
    async uploadPhoto(){
        const response = await axios.post('https://codingthailand.com/api/upload_image.php',{
            imageData: this.state.image.uri
        });
        Alert.alert(response.data.message)
    }

    _TakePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({
                image: {
                    uri: `data:${image.mime};base64,` + image.data,
                    size: image.size
                }
            });
            this.uploadPhoto();
            //alert(JSON.stringify(image));
        });
    }



    render() {
        return (
            <View style={styles.container}>

                <Button
                    backgroundColor='tomato'
                    buttonStyle={{ marginTop: 30 }}
                    large
                    title='Camera'
                    icon={{ name: 'camera', type: 'font-awesome' }}
                    onPress={this._TakePhoto}

                />
                <Button
                    backgroundColor='tomato'
                    buttonStyle={{ marginTop: 30 }}
                    large
                    title='test'
                    icon={{ name: 'camera', type: 'font-awesome' }}
                    onPress={this.uploadPhoto}

                />


                {
                    this.state.image ? (
                        <View>
                            <Image
                                source={{ uri: this.state.image.uri }}
                                style={{width:300,height:400,marginLeft:15}}
                            />
                        </View>

                    ) : (null)

                }


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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
        backgroundColor: 'tomato'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    }
});