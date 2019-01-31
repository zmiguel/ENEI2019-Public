
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar,Dimensions,Image,ActivityIndicator} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {UtilStyles} from './assets/styles'
import * as Actions from './actions'; //Import your actions
import {RkButton,
    RkTheme , RkText} from 'react-native-ui-kitten';

    import Router from './Router'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;



 class App extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
          
            token:false,
            tokenData:'',
            loggedIn:false,
            onHold:true

        };

      
    }

    componentDidMount() {

        //verifica se o utilizador tem token guardado
        this.props.checkUser();        
        console.log('logged:'+this.props.loggedIn);
    }    

    newJWT(jwt) {
        this.setState({
            jwt: jwt
        });
    }
    onSuccess = (e) => {


        this.props.login(e.data,'80f3b6e5');
      
      };

      render() {
        
        if(this.props.onHold){
            return (
                <ActivityIndicator size="large" color="#0000ff" />
            ) 

        }
        
        console.log('token... '+ this.props.token)
        
        //se existir token


        if(this.props.token == true){
            
            return (

                <Router></Router>
          
            )
            
        }else{
           
            //se não existir vai para o ecrã de scan QR
            return (


            <QRCodeScanner
           
            showMarker
            
            onRead={this.onSuccess.bind(this)}
            cameraStyle={{ height: SCREEN_HEIGHT }}
            
            customMarker={
                
                <View style={styles.rectangleContainer}>
                    <View style={styles.logo}>
                    <Image style={UtilStyles.loginImage}
                                   source={require('./assets/img/logo.png')}
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

            )
        }
       



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


function mapStateToProps(state, props) {
    
    return {

        token: state.apiReducer.token,
        tokenData:state.apiReducer.tokenData,
        loggedIn: state.apiReducer.loggedIn,
        onHold: state.apiReducer.onHold
    
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);