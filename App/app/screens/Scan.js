import React from 'react';
import { View, Image, Vibration, Dimensions,Text ,Button ,TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {UtilStyles} from '../assets/styles'
import CodeInput from 'react-native-confirmation-code-input';

import Modal from "react-native-modal";


import {RkButton,
    RkTheme , RkText} from 'react-native-ui-kitten';

    const SCREEN_HEIGHT = Dimensions.get("window").height;
    const SCREEN_WIDTH = Dimensions.get("window").width;


export default class Scan extends React.Component {

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    _activate=()=>{

        this.setState({ isModalVisible: !this.state.isModalVisible ,reactivate:true});
        this.scanner.reactivate();
    }

    onSuccess = (e) => {

        //  console.log(e.data);
        this.setState({reactivate:false})
        
        console.log(e.data);
        this.setState({isActive:false});
        this._toggleModal();;
        
      };

      state = {
            isActive:true,
            isRender: true,
            reactivate:false,
            isModalVisible: false
          
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
    
    {

        return (

          <View style={{flex: 1}}>
         
            { this.state.isRender && 
              
              <QRCodeScanner 
                showMarker
                ref={(node) => { this.scanner = node }}
                reactivate={false}
                
                onRead={this.onSuccess.bind(this)}
               
                showMarker={true}

                cameraStyle={{ height: SCREEN_HEIGHT }}
                
                fadeIn={true}

                customMarker={
                    
                    <View style={{ flex: 1 }}>
              
                    <Modal isVisible={this.state.isModalVisible} style={{backgroundColor:'#E8E8E8', borderRadius:30, height:100}}>
                      <View style={{ flex: 1 }}>
                        <Text></Text>
                        <Button onPress={this._activate} title="Close" color="#841584" accessibilityLabel="Learn more about this purple button"/>
          
                      </View>
                    </Modal>
                  </View>
                }
              />
            }
          </View>
        )}
    
        return (
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this._toggleModal}>
                <Text>Show Modal</Text>
              </TouchableOpacity>
              <Modal isVisible={this.state.isModalVisible}>
                <View style={{ flex: 1 }}>
                  <Text>Hello!</Text>
                  <TouchableOpacity onPress={this._toggleModal}>
                    <Text>Hide me!</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
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