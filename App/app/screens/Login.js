import React, {Component, Fragment} from 'react'
import {View, Image, Vibration, Dimensions,Text ,Button} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import {UtilStyles} from '../assets/styles'
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';


import {cenas} from '../services/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';

import CodeInput from 'react-native-confirmation-code-input';
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


import {RkButton,
    RkTheme , RkText} from 'react-native-ui-kitten';


export default class Login extends Component {

    static  navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }


    onSuccess = (e) => {

      //  console.log(e.data);
        
      
      deviceStorage.Login(e);

      this.props.navigation.navigate('Home');

    };

    render() {
        
      
        deviceStorage.isLogged().then(a=>{
            console.log(a);
     
            if(a)
                this.props.navigation.navigate('Home');

            
        })
     //  console.log(AsyncStorage.getItem('userToken'))

       // if(AsyncStorage.getItem('userToken')){

         //   this.props.navigation.navigate('Home');

      //  }
       

        return (
            
            
            <QRCodeScanner
                showMarker
                
                reactivate={true}
                onRead={this.onSuccess.bind(this)}
                cameraStyle={{ height: SCREEN_HEIGHT }}
                
                customMarker={
                    
                    <View style={styles.rectangleContainer}>
                        <View style={styles.logo}>
                        <Image style={UtilStyles.loginImage}
                                       source={require('../assets/img/logo.png')}
                                />
                        </View>
                          

                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.leftAndRightOverlay}>
                            </View>

                                <View style={styles.rectangle}>
                               
                            </View>


                            <View style={styles.leftAndRightOverlay}>
                            </View>
                        </View>

                        <View style={styles.bottomOverlay}>
                        
                            <View style={{flex:1, alignItems: 'center', alignContent: 'center'}}>
                                
                                <RkText rkType='primary' style={styles.recover}>Recuperar pin de acesso</RkText>
                                <RkButton rkType='dark' style={styles.manual}>lols</RkButton>
                            </View>
            
                        </View>
                    </View>
                }
            />
        );
    }
}


RkTheme.setType('RkButton', 'dark', {
    container: {
        paddingTop:10,
       backgroundColor: 'gray',
       
       borderRadius: 90,
    }
  });


const rectDimensions = SCREEN_WIDTH * 0.85; // this is equivalent to 255 from a 393 device width

const overlayColor = 'rgba(0,0,0,0.30)';

const styles = {
 
    recover:{
        paddingTop:10,
        color: "red",
        paddingBottom:10
    },
    manual:{
      
        

    },
    
    logo:{

        height:SCREEN_HEIGHT*0.35,
        width:SCREEN_WIDTH,
        backgroundColor: overlayColor,
    },
    rectangleContainer: {
       
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
     
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
        backgroundColor: overlayColor,
        justifyContent: "center",
        alignItems: "center"
    },

    bottomOverlay: {
        flex: 1,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        paddingBottom: SCREEN_WIDTH * 0.2
    },

    leftAndRightOverlay: {
        height: rectDimensions,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor
    },
};


