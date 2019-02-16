import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    Dimensions, 
    Image, 
    ActivityIndicator, 
    Button, 
    TouchableHighlight,
    Keyboard,
    ImageBackground,
    LinearGradient,
    TouchableOpacity,
    TextInput,
    

} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {UtilStyles} from './assets/styles'

import * as Actions from './store/actions'; //Import your actions

import {RkButton, RkTheme, RkText, RkTextInput} from 'react-native-ui-kitten';

import Modal from "react-native-modal";

import Router from './Router'

import Icon from "react-native-vector-icons/Ionicons"

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

import Swiper from 'react-native-swiper';


class App extends Component {
    
    _activate=()=>{

        this.setState({ isModalVisible: !this.state.isModalVisible});
        this.scanner.reactivate();

    }
    _scanQr=()=>{
        this.props.openScannerLogin()
        console.log(this.props.UI_loginScannerActive)
    }
    _tryLogin=()=>{
       
        //console.log(this.state.text)
        //this.scanner.reactivate();
        this.props.login(this.state.username, this.state.text);
        
      
       
    }   

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    constructor(props) {

        super(props);
       
        this.state = {

            token: {valid: false},
            tokenData: '',
            onHold: true,
            logged: false,
            isModalVisible: false,
            state : {text: ''},
            username:'QR code',
            failedAttempt: false,
            push:4,
             UI_loginScannerActive:false

        };

    }
    _print=()=>{
        console.log("hello")
        this.setState({push:0})
    }
    checkValue=(e)=>{
        console.log("check"+e)
    }
    componentDidMount() {
        this.setState({isModalVisible: false})
        //verifica se o utilizador tem token guardado
        this.props.checkUser();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
 

    }
    _keyboardDidShow () {
        //alert('Keyboard Shown');
      //  this.setState({push:0})

      }
    
      _keyboardDidHide () {

        //this.setState({push:4})

      }
    onSuccess = (e) => {

       // this.setState({ isModalVisible: !this.state.isModalVisible });
         //  this.props.login(e.data, 'f8908cc0');
         this.props.closeLoginQRScan();
        this.setState({username:e.data})

        console.log("tentativa de login");



    };

    render() {

        if (this.props.onHold && !this.props.logged) {


            return (
                <View style={UtilStyles.containerLoading}>
                    <Text>CARREGANDO {this.props.onHold}</Text>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )

        }
        {

            //console.log('token... '+ this.props.logged)

            //se existir token

            if (this.props.logged) {

                return (

                    <Router></Router>
                )
            }
            return (
                <Swiper style={styles.wrapper} 
                    showsButtons={false}
                    //paginationStyle={{backgroundColor: 'white'}}
                    dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 15, height: 15,borderRadius: 8, marginLeft: 6, marginRight: 6, marginTop: 6, marginBottom: 6,}} />}
                    activeDot={<View style={{backgroundColor: 'red', width: 15, height: 15, borderRadius: 8, marginLeft: 6, marginRight: 6, marginTop: 6, marginBottom: 6,}} />}
    
                >
                  
                  <View style={styles.slide1}>
                  <View style={styles.logoContainer}>

                    <Image style={styles.logo2} source={require('./assets/img/logo2.png')}/>
                   
                    </View>
                    
                    <ImageBackground 
                    opacity={0.5}
                    source={require('./assets/img/bg_coimbra.png')} 
                    style={{
                        width: '100%', 
                        height: '100%',
                        
                      //  marginTop:150,
                        backgroundColor: 'rgba(255,255,255,0.4)' , 
                 
                    }
                }
                    
                    >
                   
                    <Text></Text>
                
                     </ImageBackground>
                 
                  </View>
    
                  <View style={styles.slide2}>
                  <Modal isVisible={this.props.UI_loginScannerActive}>
          <View style={{ flex: 1 , backgroundColor:'white'}}>
          <Button onPress={this.props.closeLoginQRScan} title={"Fechar scanner"}> </Button>

            <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        cameraStyle={ styles.cameraContainer}
       
        
          
           
        
          
       
      />
          </View>
          
        </Modal>
                  <View style={{ width:'100%',
            
            justifyContent: 'center',
            alignItems: 'center',}}>
                    <Image style={styles.logo2} source={require('./assets/img/logo2.png')}/>
                   
                    </View>
            <View styles={styles.loginContainer}>

                   

                
                    <View style={styles.inputSection}>
   
    <TextInput
        style={styles.input}
        placeholder={this.state.username}
        onChangeText={(searchString) => {this.setState({searchString})}}
        maxLength={15}
        underlineColorAndroid="transparent"
    />
 <TouchableOpacity onPress={this._scanQr}>
    
 <View style={styles.scanQR}>
  
   <Icon style={styles.searchIcon} name="ios-qr-scanner" size={30} color="#000"/> 
   <Text>Scan QR</Text>
  
   </View>
    </TouchableOpacity>
  
  
     </View>
                     
                    <TextInput style={styles.passwordInput} 
                     onFocus={this._print} 
                     maxLength={10} 
                     blurOnSubmit ={true} 
                     secureTextEntry={true} 
                    
                     onChangeText={(text) => this.setState({text})}  
                     clearButtonMode='always'   
                     value={this.state.text}
                     clearTextOnFocus={true}
                     onSubmitEditing={Keyboard.dismiss}
                     placeholder='Password' />
          
              <RkButton rkType='dark' style={styles.loginBtn} onPress={this._tryLogin}>Entrar</RkButton>

                    </View>
                
            <View style={ styles.buttons }>
              <TouchableOpacity
                style={styles.button}>
    
                <Icon name="logo-facebook" size={40}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}>
    
                <Icon name="logo-instagram" size={40}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}>
    
                <Icon name="md-heart" size={40}/>
    
            </TouchableOpacity>
        
            </View>
            <View style={styles.footer}>
              <View style={styles.textRow}>
       
                <RkText  rkType='primary3'>Não sabes a password?</RkText>
             <RkButton rkType='clear' onPress={this.onSignUpButtonPressed}>
               
                <TouchableOpacity>
                  <RkText style={{color:'red'}} kType='header6'>Recuperar Password</RkText>
                </TouchableOpacity>
                
                </RkButton>
    
              </View>
            </View>
                  </View>
                  <View style={styles.slide3}>
                    <Text>Manual de utilização</Text>
                  </View>
                  
                </Swiper>
              );
            {

                
                //se não existir vai para o ecrã de scan QR
                return (

                    <QRCodeScanner
                        ref={(node) => { this.scanner = node }}
                        showMarker
                     
                        onRead={this.onSuccess.bind(this)}
                        cameraStyle={{height: SCREEN_HEIGHT}}

                        customMarker={
                            
                            
                            <View style={styles.rectangleContainer}>

                            <Modal 
                                isVisible={this.state.isModalVisible} 
                                style={
                                    {
                                        backgroundColor:'#E8E8E8', 
                                        borderRadius:10, 
                                        marginTop:SCREEN_HEIGHT /this.state.push,
                                        height:SCREEN_HEIGHT/2
                                        
                                    }
                                } 
                                animationInTiming={1000}
                                animationOutTiming={1000}
                                >
                            <View style={{ flex: 1}}>

                            <Text></Text>
                              <Text> Introduza a password</Text>

                              <RkTextInput 
                                    onFocus={this._print} 
                                    maxLength={10} 
                                    blurOnSubmit ={true} 
                                    secureTextEntry={true} 
                                    rkType='rounded'  
                                    onChangeText={(text) => this.setState({text})}  
                                    clearButtonMode='always'   
                                    value={this.state.text}
                                    clearTextOnFocus={true}
                                    onSubmitEditing={Keyboard.dismiss}
                            />
                             
                              <Button onPress={this._tryLogin} title="Login" color="#841584" />
                                
                              { this.props.failedAttempt && 
                                <Text> Password ou QR incorrecto</Text>
                              }

                        
                            <Text></Text>
                            <Button onPress={this._activate} title="Scan again!" color="green" accessibilityLabel="Learn more about this purple button"/>
                           
                         
                           

                            </View>
                         
                          </Modal>
                                <View style={styles.logo}>
                                    <Image style={UtilStyles.loginImage}
                                           source={require('./assets/img/logo.png')}
                                    />
                                </View>


                                <View style={{flexDirection: "row"}}>
                                    <View style={styles.leftAndRightOverlay}>
                                    </View>

                                    <View style={styles.rectangle}>

                                    </View>


                                    <View style={styles.leftAndRightOverlay}>
                                    </View>
                                </View>

                                <View style={styles.bottomOverlay}>

                                    <View style={{flex: 1, alignItems: 'center', alignContent: 'center'}}>
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
}


RkTheme.setType('RkButton', 'dark', {
    container: {
        paddingTop: 10,
        backgroundColor: 'gray',

        borderRadius: 90,
    }
});


const rectDimensions = SCREEN_WIDTH * 0.85; // this is equivalent to 255 from a 393 device width

const overlayColor = 'rgba(0,0,0,0.30)';

const styles = {
    cameraContainer:{
      //  height: Dimensions.get('window').height ,
    },
    passwordInput:{
        borderRadius: 90,
     
        borderColor:'#bfbdbd',
        borderWidth: 1,
        marginTop:20,
        marginBottom:20,
        width:SCREEN_WIDTH*0.8,
     
        backgroundColor: 'white',

        borderRadius: 90,
        height: SCREEN_HEIGHT*0.08,
        borderColor:'#bfbdbd',
        borderWidth: 1,
        paddingLeft:SCREEN_WIDTH*0.05,
        
    },
    scanQRText:{

        paddingTop:50
       // paddingTop:20,
      

    },
    scanQR:{
        fontFamily: 'Open Sans',
        //flexDirection: 'row',
        paddingTop:5,
        backgroundColor:10,
        
        width:80,
        paddingLeft:10,
        backgroundColor:'#f24b4b',
        borderBottomRightRadius:90,
        borderTopRightRadius:90,
        height:'100%',
       
    },
    inputSection: {
     
        flexDirection: 'row',
        backgroundColor: '#fff',
      
        backgroundColor: 'white',

        borderRadius: 90,
        height: SCREEN_HEIGHT*0.08,
        borderColor:'#bfbdbd',
        borderWidth: 1,
     

    },
    searchIcon: {
       paddingLeft:10
    },

    input: {
        
        
        fontFamily: 'Open Sans',
        flex: 1,
        paddingRight: 10,
        
      
        paddingLeft: 0,
        paddingLeft:SCREEN_WIDTH*0.05,
        color: '#424242',
       
    },
    textRow:{
        marginBottom:40
    },
    loginContainer:{
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginBtn:{
        marginTop:10,
      marginBottom:20,
      marginLeft: '25%',
   
    },
  
    button: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:60,
      height:60,
      backgroundColor:'#fff',
      borderRadius:100,
      marginRight: 10,
      marginLeft:10
      },
    footer: {},

    buttons: {
        flexDirection: 'row',
        marginBottom: 24,
        marginHorizontal: 24,
        marginTop:24,
        justifyContent: 'space-around',
      
      
      },

    logoContainer:{

        width:'100%',
        
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:200

    },

    logo2:{
       
       // flex: 1,
      //  resizeMode: 'contain',
        width: 200, height: 200,

    },
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      color:'black',
      backgroundColor: 'white',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    recover: {
        paddingTop: 10,
        color: "red",
        paddingBottom: 10
    },
    manual: {},

    logo: {

        height: SCREEN_HEIGHT * 0.35,
        width: SCREEN_WIDTH,
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
RkTheme.setType('RkTextInput', 'frame', {
    input: {
      backgroundColor: 'white',
      marginLeft: 0,
      marginHorizontal: 0,
      borderRadius: 5
    },
    color: 'gray',
    backgroundColor: 'gray',
    borderRadius: 10,
    container: {
      paddingHorizontal: 20
    }
  });
  
mapStateToProps = (state, props) => {

    return {
        token: state.apiReducer.token,
        loggedIn: state.apiReducer.loggedIn,
        onHold: state.apiReducer.onHold,
        logged: state.apiReducer.logged,
        failedAttempt:state.apiReducer.failedAttempt,
        UI_loginScannerActive: state.uiReducer.UI_loginScannerActive
    }
};

mapDispatchToProps = (dispatch) => {

    return bindActionCreators(Actions, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(App);