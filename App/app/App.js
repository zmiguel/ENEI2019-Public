import React, { Component } from "react";
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
  NetInfo,
  Animated
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import QRCodeScanner from "react-native-qrcode-scanner";
import { UtilStyles } from "./assets/styles";

import * as Actions from "./store/actions";

import { RkButton, RkTheme, RkText, RkTextInput } from "react-native-ui-kitten";

import Modal from "react-native-modal";

import Router from "./Router";

import Icon from "react-native-vector-icons/Ionicons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

import Swiper from "react-native-swiper";
import resetPassword from "./screens/resetPassword";
var TimerMixin = require("react-timer-mixin");

function handleConnectivityChange() {
  console.log("asdasd");
}

class App extends Component {

 

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };
  _activate = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.scanner.reactivate();
  };
  _scanQr = () => {
    this.props.openScannerLogin();
    console.log(this.props.UI_loginScannerActive);
  };
  _tryLogin = () => {
    this.props.waitLogin();
    //console.log(this.state.text)
    //this.scanner.reactivate();
    this.props.login(this.state.username, this.state.text);
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  constructor(props) {
    super(props);

    this.state = {
      token: { valid: false },
      tokenData: "",
      onHold: true,
      logged: false,
      isModalVisible: false,
      state: { text: "" },
      username: "QR code",
      failedAttempt: false,
      push: 4,
      UI_loginScannerActive: false,
      userDetails: { username: "", password: "" },
      isConnected: true,
      modalOpen: false,
      modalResetPassword:false,
      resetText:''
    };
  }
  _print = () => {
    console.log("hello");
    this.setState({ push: 0 });
  };
  checkValue = e => {
    console.log("check" + e);
  };
  _handleConnectionChange = isConnected => {
    this.props.connectionState(true);
  };

  componentDidMount() {
    //this.props.hold();
    this.props.loginInternal();
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );

    this.setState({ isModalVisible: false });
    //verifica se o utilizador tem token guardado
    this.props.checkUser(this.props.userDetails);
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }
  _toggle=()=>{
    this.setState({modalResetPassword:false})
  }
  //faz call
  _reset=()=>{
    //fecha modal
    this.props.resetPassword(this.props.userDetails.token,this.state.resetText), 
    this.setState({modalResetPassword:false})
    //faz call
  }

  _keyboardDidShow() {
    //alert('Keyboard Shown');
    //  this.setState({push:0})
  }

  _keyboardDidHide() {
    //this.setState({push:4})
  }
  onSuccess = e => {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    // this.props.login(e.data, 'f8908cc0');
    this.props.closeLoginQRScan();
    this.setState({ username: e.data });

    console.log("QR code lido");
  };

  render() {
    
   


    if (!this.props.logged && this.props.onHold) {
      return (
        <View style={UtilStyles.containerLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    } else {
      // console.log('token... '+ this.props.logged)

      //se existir token

      if (this.props.logged) {
        return <Router />;
      }
      return (
        
        <View style={styles.slide2}>
          <Modal isVisible={this.props.UI_loginScannerActive}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <Button
                onPress={this.props.closeLoginQRScan}
                title={"Fechar scanner"}
              >
                {" "}
              </Button>

              <QRCodeScanner
                onRead={this.onSuccess}
                cameraStyle={styles.cameraContainer}
              />
            </View>
          </Modal>
          <Modal
            isVisible={this.state.modalResetPassword}
            onBackdropPress={this._toggle}
            onBackButtonPress={this._toggle}
            animationInTiming={1100}
            animationOutTiming={1100}
            >
            <View style={{  backgroundColor: "white" , padding:20,paddingBottom:0, alignItems:'center'}}>
            <View>
              <Text style={{textAlign:'center',fontSize:23, fontWeight:'bold', color:'#CC1A17', margin:30}}>Reset Password</Text>
            <Text style={{textAlign:'center', }}>Deves introduzir o email com o qual efectuaste a compra do bilhete.</Text>
            <TextInput
              style={styles.resetPassword}
              onFocus={this._print}
              maxLength={50}
              blurOnSubmit={true}
          
              onChangeText={r => this.setState({ resetText:r })}
              clearButtonMode="always"
              value={this.state.resetText}
              clearTextOnFocus={true}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Email ou Qr code"
            />
           
              <Button
                onPress={this._reset}
                title={"Enviar"}
              color={"#CC1A17"}
              ></Button>
                <Text style={{textAlign:'center', fontSize:12, margin:10,marginBottom:5}}> Caso tenhas problemas com este processo deves contactar a comissão organizadora atravês do email geral.</Text>
           
              </View>
            </View>
          </Modal>
          <View
            style={{
              width: "100%",

              justifyContent: "center",
              alignItems: "center",
              margin:20
            }}
          >
            <Image
              style={styles.logo2}
              source={require("./assets/img/logo2.png")}
            />
          </View>
          <View styles={styles.loginContainer}>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                placeholder={this.state.username}
                onChangeText={searchString => {
                  this.setState({ searchString });
                }}
                maxLength={15}
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity onPress={this._scanQr}>
                <View style={styles.scanQR}>
                  <Icon
                    style={styles.searchIcon}
                    name="ios-qr-scanner"
                    size={40}
                    color="#000"
                  />

                </View>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.passwordInput}
              onFocus={this._print}
              maxLength={10}
              blurOnSubmit={true}
              secureTextEntry={true}
              onChangeText={text => this.setState({ text })}
              clearButtonMode="always"
              value={this.state.text}
              clearTextOnFocus={true}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Password"
            />
            { !this.props.loadingLogin &&
           <View style={{alignItems:'center', margin:20}}>
           <TouchableOpacity  onPress={this._tryLogin} style={{backgroundColor:'#CC1A17',borderRadius:3}}>
           <Text style={{color:'white', fontSize:20, margin:10, width:150,textAlign:'center',}}>Login</Text>
           </TouchableOpacity>
           </View>
            }
            {this.props.alignItems && 
                <ActivityIndicator size="large" color="#0000ff" />
            }
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}>
              <Icon name="logo-facebook" size={40} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Icon name="logo-instagram" size={40} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Icon name="md-heart" size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType="primary3">Não sabes a password?</RkText>
              <RkButton rkType="clear" onPress={this.onSignUpButtonPressed}>
                <TouchableOpacity onPress={() => {this.setState({modalResetPassword:true})}}>
                  <RkText style={{ color: "#CC1A17", fontWeight:'bold' }} kType="header6">
                   Reset Password
                  </RkText>
                </TouchableOpacity>
              </RkButton>
            </View>
          </View>
        </View>
      );
    }
  }
}

RkTheme.setType("RkButton", "dark", {
  container: {
    paddingTop: 10,
    backgroundColor: "gray",

    borderRadius: 90
  }
});

const rectDimensions = SCREEN_WIDTH * 0.85; // this is equivalent to 255 from a 393 device width

const overlayColor = "rgba(0,0,0,0.30)";

const styles = {
  cameraContainer: {
      height: Dimensions.get('window').height ,
  },
  resetPassword:{
  
    

    borderColor: "#bfbdbd",
    borderWidth: 1,
    margin:20,
    marginTop: 60,
    marginBottom: 60,

    width: SCREEN_WIDTH * 0.8,

    backgroundColor: "white",

    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.08,
    borderColor: "#bfbdbd",
    borderWidth: 1,
    paddingLeft: SCREEN_WIDTH * 0.05
  },
  passwordInput: {
  

    borderColor: "#bfbdbd",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    width: SCREEN_WIDTH * 0.8,

    backgroundColor: "white",

    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.08,
    borderColor: "#bfbdbd",
    borderWidth: 1,
    paddingLeft: SCREEN_WIDTH * 0.05
  },
  scanQRText: {
    paddingTop: 50
    // paddingTop:20,
  },
  scanQR: {
    //flexDirection: 'row',
    flex:1,
//paddingTop: 5,
    backgroundColor: 10,
    alignItems:'center',
  padding:5,
  paddingRight:15,

    //width: 80,
   // paddingLeft: 10,
    backgroundColor: "#CC1A17",
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
   // height: "100%"
  },
  inputSection: {
    flexDirection: "row",
    backgroundColor: "#fff",

    backgroundColor: "white",

    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.08,
    borderColor: "#bfbdbd",
    borderWidth: 1
  },
  searchIcon: {
    paddingLeft: 10
  },

  input: {
    flex: 1,
    paddingRight: 10,

    paddingLeft: 0,
    paddingLeft: SCREEN_WIDTH * 0.05,
    color: "#424242"
  },
  textRow: {
    marginBottom: 40
  },
  loginContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  loginBtn: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: "25%"
  },

  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginRight: 10,
    marginLeft: 10
  },
  footer: {},

  buttons: {
    flexDirection: "row",
    marginBottom: 24,
    marginHorizontal: 24,
    marginTop: 24,
    justifyContent: "space-around"
  },

  logoContainer: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,

  },

  logo2: {
    // flex: 1,
    //  resizeMode: 'contain',
    width: 200,
    height: 200
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    backgroundColor: "white"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
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
    backgroundColor: overlayColor
  },
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
  }
};
RkTheme.setType("RkTextInput", "frame", {
  input: {
    backgroundColor: "white",
    marginLeft: 0,
    marginHorizontal: 0,
    borderRadius: 5
  },
  color: "gray",
  backgroundColor: "gray",
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
    failedAttempt: state.apiReducer.failedAttempt,
    UI_loginScannerActive: state.uiReducer.UI_loginScannerActive,
    userDetails: state.apiReducer.userDetails,
    modalOpen: state.apiReducer.modalOpen,
    modalInfo: state.apiReducer.modalInfo,
    type: state.apiReducer.type,
    loadingLogin:state.apiReducer.loadingLogin
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
