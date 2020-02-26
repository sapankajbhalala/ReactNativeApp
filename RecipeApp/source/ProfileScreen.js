import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Permissions from 'expo-permissions'
import MapView, { Marker } from 'react-native-maps'
// import * as ImagePicker from 'expo-image-picker';
import ImagePicker from 'react-native-image-picker';


export default class ProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
        
    }
    componentDidMount=() =>{
        // Permissions.askAsync(Permissions.CAMERA)
        // Permissions.askAsync(Permissions.CAMERA_ROLL)
    }
    clickedOnImage = () => {
        ImagePicker.showImagePicker({
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          },(response) => {
              this.setState({
                image: response.uri,
              });
        })
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.topView}>
                        <TouchableOpacity 
                            onPress={this.clickedOnImage} >
                             {this.state.image ?
                                <Image source={{ uri: this.state.image }} style={styles.imageView} />
                                :
                                <Image source={require("./assets/profile.png")} style={styles.imageView} />
                            }   
                        </TouchableOpacity>
                        <Text style={styles.nameText}> Jay Mehta </Text>
                    </View>                    
                    {/* <View style={styles.overlayView}>
                {this.state.image ?
                                <Image source={{ uri: this.state.image }} style={styles.imageView} />
                                :
                                <Image source={require("./assets/profile.png")} style={styles.imageView} />
                            }
                            </View> */}

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
        alignItems: 'center',
        margin: 5,
        // justifyContent: "flex-start",
    },
    overlayView: {
        margin: 5,
        alignItems: 'center',
    position: "absolute",
    top: 50,
    // left: 0,
    width: '100%',
    height: '100%',
    },
    scrollView: {
        backgroundColor: 'yellow',
        flex: 1
    },
    topView: {
        // flex: 0.5,
        backgroundColor: '#f7f5f5',
        alignItems: 'center',
        paddingTop: 70,
        width: '100%'
    },
    nameText: {
        color: '#736d6d',
        fontFamily: 'AvenirNext-Heavy',
        fontSize: 25,
        paddingBottom: 40,
    },
    imageView: {
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        resizeMode: 'cover',
        // backgroundColor: 'white'
    },
    touchableView: {
        flexDirection: 'row'
    },
});