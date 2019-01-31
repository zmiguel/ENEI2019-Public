import React from 'react';
import { View, Image, Vibration, Dimensions,Text ,Button ,TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {UtilStyles} from '../assets/styles'
import CodeInput from 'react-native-confirmation-code-input';
import {RkButton,
    RkTheme , RkText} from 'react-native-ui-kitten';

    const SCREEN_HEIGHT = Dimensions.get("window").height;
    const SCREEN_WIDTH = Dimensions.get("window").width;


export default class Scan extends React.Component {

    onSuccess = (e) => {

        //  console.log(e.data);
          
        
     console.log(e.data);
  
      
  
      };

      state = {
        isRender: true
      }
      componentDidMount() {
        this.props.navigation.addListener('willFocus', (route) => {
          this.setState({ isRender: true })
        });
        this.props.navigation.addListener('willBlur', (route) => {
          this.setState({ isRender: false })
        });
      }
      render() {
        return (
          <View style={{flex: 1}}>
          <Text> Camera Loading....</Text>
            { this.state.isRender &&
              <QRCodeScanner />
            }
          </View>
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