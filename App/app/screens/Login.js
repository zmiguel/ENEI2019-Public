import React, {Component, Fragment} from 'react'
import {View, Image, Vibration, Dimensions} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import {UtilStyles} from '../assets/styles'

import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

import QRCodeScanner from 'react-native-qrcode-scanner';


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class Login extends Component {

    static  navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }


    onSuccess = (e) => {
        console.log(e.data)



    };

    render() {
        return (
            <QRCodeScanner
                showMarker
                onRead={this.onSuccess.bind(this)}
                cameraStyle={{ height: SCREEN_HEIGHT }}
                customMarker={
                    <View style={styles.rectangleContainer}>
                            <View style={styles.topOverlay}>
                                <Image style={UtilStyles.loginImage}
                                       source={require('../assets/img/logo.png')}
                                />
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.leftAndRightOverlay}>
                            </View>

                            <View style={styles.rectangle}>
                                <Icon
                                    name="ios-qr-scanner"
                                    size={SCREEN_WIDTH}
                                    color={"#fff"}
                                />
                            </View>


                            <View style={styles.leftAndRightOverlay}>
                            </View>
                        </View>

                        <View style={styles.bottomOverlay}>
                        </View>
                    </View>
                }
            />
        );
    }
}



const rectDimensions = SCREEN_WIDTH * 0.85; // this is equivalent to 255 from a 393 device width

const overlayColor = 'rgba(0,0,0,0.85)';

const styles = {
    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },

    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },

    topOverlay: {
        flex: 1,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        justifyContent: "center",
        alignItems: "center"
    },

    bottomOverlay: {
        flex: 1,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        paddingBottom: SCREEN_WIDTH * 0.25
    },

    leftAndRightOverlay: {
        height: rectDimensions,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor
    },
};


