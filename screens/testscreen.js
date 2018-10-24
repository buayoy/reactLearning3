import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, NativeModules, Alert } from 'react-native';
var ImagePicker = NativeModules.ImageCropPicker;
export default class Testscreen extends Component {


  constructor() {
    super();
    this.state = {
      image: null
    };
  }

  openCamera() {

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });

  }

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height }
      });
    }).catch(e => alert(e));
  }

  pickSingle(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime }
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }


  renderImage(image) {
    return <Image style={{ width: null, height: 200, resizeMode: 'cover' }} source={image} />
  }


  upload=()=>{
    const data = new FormData();
    data.append('username', 'test'); // you can append anyone.
    data.append('password', '1234'); // you can append anyone.
    data.append('userfile', {
      uri: this.state.image.uri,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    });
    fetch("http://10.0.1.8:3000/uploads", {
      method: "POST",
      body: data
    })
    .then(res=> res.json())
    .then(res=>{
      Alert.alert(res.result);
    });

  }


  render() {
    return (
      <View style={styles.container}>

        {this.state.image ? <Text>{this.state.image.uri}</Text> : null}
        {this.state.image ?
          <TouchableOpacity onPress={this.upload} style={styles.button}>
            <Text style={styles.text}>Upload</Text>
          </TouchableOpacity>
          : null
        }

        {this.state.image ? this.renderImage(this.state.image) : null}



        <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
          <Text style={styles.text}>Select Single With Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
          <Text style={styles.text}>Select Single With Camera With Cropping</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
          <Text style={styles.text}>Select Single</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginBottom: 10,
    width: 300,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000FF'
  },
  text: {
    color: "#FFFF"
  }
});
