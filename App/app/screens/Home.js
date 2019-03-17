import React, { Component } from "react";

import {
  Button,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  NetInfo,
  AppState,
  TextInput,
  Keyboard
} from "react-native";

import Modal from "react-native-modal";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Shadow } from "react-native-shadow";
import Icon from "react-native-vector-icons/Ionicons";
import { RkButton, RkTheme } from "react-native-ui-kitten";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as Actions from "../store/actions"; //Import your actionss
import ImageOverlay from "react-native-image-overlay";

import { createStore } from "redux";
import PTRView from "react-native-pull-to-refresh";
import { Provider } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import { Card, Divider } from "react-native-elements";

import RNMaterialShadows from "react-native-material-shadows";

import IconFA from "react-native-vector-icons/FontAwesome5";

class Home extends Component {
  _handleConnectionChange = isConnected => {
    // this.props.dispatch(connectionState({ status: isConnected }));
    console.log("fck that");
  };
  _refresh() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
  _callApi() {
    this.props.getUserInfo(this.props.token);
  }
  constructor(props) {
    super(props);

    this.state = {
      token: { valid: false },
      logged: true,
      onHold: true,
      user: { Name: "" },
      userDetails: {},
      appState: AppState.currentState,
      addUser:false
    };
  }
  handleConnectivityChange = () => {
    console.log("asdasdasdasdasd");
  };

  componentDidMount() {
    console.log("hold" + this.props.onHold);

    this.props.getUserInfo(this.props.token);

    console.log(this.props.internalToken)
    this.props.getUserTeam(this.props.user, "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJjZW5hIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNTUyODM4NTk5LCJleHAiOjE1NTI5MjQ5OTksImlhdCI6MTU1MjgzODU5OX0.KmzDoneEdlzyaTS3N4pSuRYHkdrpTVjPFXVIB4tMKPh1BK4KtIOfqHJ_H3FsrUEkXKb_tnf38swO5SKQ1wt0cg"
    );
    this.props.getEvents(this.props.user);
  }
  componentWillUnmount() {}

  bClick() {
    //this.props.logoutUser();

    let a = {};
    // this.setState({ user: this.props.user });
    // console.log(this.props.user)
    //

    //var navigate  = this.props.navigation.navigate
  }
  _update = () => {
    this.props.getUserInfo(this.props.token);
    this.props.getEvents(this.props.user);
  };
  onSuccess=e=>{
    //fecha o scanner 
    this.props.addUserTeam({id:this.props.team.id, newQr:e.data}, "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJjZW5hIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNTUyODM4NTk5LCJleHAiOjE1NTI5MjQ5OTksImlhdCI6MTU1MjgzODU5OX0.KmzDoneEdlzyaTS3N4pSuRYHkdrpTVjPFXVIB4tMKPh1BK4KtIOfqHJ_H3FsrUEkXKb_tnf38swO5SKQ1wt0cg"
    )
    this.setState({addUser:!this.state.addUser})
    
  
  }
_toggle=()=>{
  this.setState({addUser:!this.state.addUser})

}
  render() {
    const { navigate } = this.props.navigation;

    if (this.props.onHold) {
      return (
        <View>
          <Text>lollsss {this.props.onHold}</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (this.props.logged) {
      return (
        <PTRView onRefresh={this._update}>
          <ScrollView style={{ backgroundColor: "#eeeeee" }}>
            <View>
             <Modal
                 isVisible={this.state.addUser}
                 onBackdropPress={this._toggle}
                 onBackButtonPress={this._toggle}
                 animationInTiming={1100}
                 animationOutTiming={1100}
                style={{marginTop:-20}}
                 >
    
                 <QRCodeScanner
      onRead={this.onSuccess}
       
      cameraStyle={styles.cameraContainer}
      showMarker={true}
      />
                   <Button
                     onPress={this._toggle}
                     title={"Fechar Scan"}
                   color={"#CC1A17"}
                   ></Button>
                     <Text style={{textAlign:'center', fontSize:12, margin:10,marginBottom:5, color:'white'}}> Caso tenhas problemas com este processo deves contactar a comissão organizadora atravês do email geral.</Text>
                
              
               </Modal>
              
              <ImageBackground
                opacity={0.9}
                source={require("../assets/img/bg_3.jpg")}
                style={{
                  width: "100%",

                  //  marginTop:150,
                  backgroundColor: "rgba(255,255,255,1)"
                }}
              >
                <View style={styles.homeHeader}>
                  <View style={styles.userImageContainer}>
                    <Image
                      style={styles.userImage}
                      source={{ uri: "https://i.imgur.com/XXJ7LxV.jpg" }}
                    />
                  </View>
                  {this.props.user != undefined && (
                    <Text style={styles.userText}>{this.props.user.Name}</Text>
                  )}
                  <Text style={styles.userTextSub}>
                    {this.props.user.Company}
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.userStats}>
                <View style={{ backgroundColor: "orange" }}>
                  <Text style={styles.userStatsTitle}>
                    O que inclui o meu bilhete?
                  </Text>
                </View>
                <View
                  style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}
                >
                  <View style={styles.colBilhete}>
                    <Text style={styles.titleBilhete}>Acesso </Text>
                    <FlatList
                      data={this.props.acesso}
                      renderItem={({ item }) => (
                        <View style={styles.boxStyle}>
                          <Text>
                            <IconFA name="check" size={18} color={"#CC1A17"} />{" "}
                            {item}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                  <View style={styles.colBilhete}>
                    <Text style={styles.titleBilhete}>Alojamento</Text>
                    <FlatList
                      data={this.props.alojamento}
                      renderItem={({ item }) => (
                        <View style={styles.boxStyle}>
                          <Text>
                            <IconFA name="check" size={18} color={"#CC1A17"} />{" "}
                            {item}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                  <View style={styles.colBilhete}>
                    <Text style={styles.titleBilhete}>Alimentação</Text>
                    <FlatList
                      data={this.props.alimentacao}
                      renderItem={({ item }) => (
                        <View style={styles.boxStyle}>
                          <Text>
                            <IconFA name="check" size={18} color={"#CC1A17"} />{" "}
                            {item}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>

              <View>
                <View
                  style={{
                    margin: 10,
                    marginTop: 20,
                    backgroundColor: "white",
                    borderRadius: 3
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#CC1A17",
                      flex: 1,
                      flexDirection: "row"
                    }}
                  >
                    <View style={{ width: "79%" }}>
                      <Text
                        style={{
                          fontSize: 25,
                          color: "white",
                          margin: 10,
                          fontWeight: "bold",
                          marginBottom: 0
                        }}
                      >
                        {this.props.team.nome}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          marginLeft: 10,
                          marginBottom: 5
                        }}
                      >
                        {this.props.team.nMembros}/6 elementos
                      </Text>
                    </View>
                    <TouchableOpacity onPress={this._toggle}>
                    <View
                      style={{
                        alignItems: "center",
                        alignContent: "center",
                        alignSelf: "center",
                        marginTop:7
                      }}
                    >
                      <IconFA name="plus" color={"white"} size={30} />
                      <Text style={{ color: "white" }}>Adicionar</Text>
                    </View>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        data={this.props.team.membros}
                        renderItem={({ item }) => (
                          <View>
                            <View style={styles.user}>
                              <View style={styles.userLogo}>
                                <IconFA name="user" size={40} />
                              </View>
                              <View style={styles.userT}>
                                <Text style={styles.userName}>
                                  {item.username}
                                </Text>
                                <Text>{item.qRcode}</Text>
                              </View>

                              <TouchableOpacity style={styles.userRemove}>
                                <Text style={{ fontWeight: "bold" }}>
                                  remover
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <Divider style={{ backgroundColor: "black" }} />
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </PTRView>
      );
    } else {
      return (
        <View>
          <Text>sem permissões para aceder aqui</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    height: Dimensions.get('window').height,
  
  },
  titleBilhete: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10
  },
  colBilhete: {
    width: "33%",
    padding: 10
  },
  boxStyle: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: "#CC1A17"
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  userRemove: {
    alignContent: "center",
    alignItems: "center",

    alignSelf: "center"
  },
  userT: {
    margin: 10,

    width: "55%"
    // backgroundColor: "red"
  },
  userLogo: {
    paddingLeft: 10,

    margin: 10
  },
  user: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",

    margin: 10,

    marginTop: 5,
    width: "100%"
  },
  userBoxText: {
    color: "white",
    fontWeight: "bold"
  },
  userStatsBoxIcon: {
    color: "white"
  },
  userStatsBox: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row"
  },
  userBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "33%"
  },
  userCurriculum: {
    paddingTop: 5,
    color: "red",
    fontWeight: "bold",
    fontSize: 15
  },
  userBioRow: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  userBioText: {},
  userBioLogo: {
    marginLeft: SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH * 0.15
  },

  userTextSub: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white"
  },
  userText: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  homeHeader: {
    flex: 1,

    height: SCREEN_HEIGHT * 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  userImage: {
    width: 110,
    height: 110,
    borderWidth: 1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white"
  },
  userBio: {
    flex: 1,
    padding: 10,
    margin: 9,
    backgroundColor: "white",
    // height: SCREEN_HEIGHT*0.20,
    color: "black",
    borderRadius: 5
  },
  userStats: {
    backgroundColor: "white",
    //height: SCREEN_HEIGHT * 0.2,
    //  padding: 10,
    margin: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 0
  },
  userStatsTitle: {
    margin: 10,
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    padding: 1
  },
  userImageContainer: {
    alignSelf: "center"

    // transform: [{ rotate: '-15deg'}],
  }
});
function mapStateToProps(state, props) {
  return {
    token: state.apiReducer.token,
    user: state.apiReducer.user,
    logged: state.apiReducer.logged,
    userDetails: state.apiReducer.userDetails,
    onHold: state.apiReducer.onHold,
    bilhete: state.apiReducer.bilhete,
    alimentacao: state.apiReducer.alimentacao,
    alojamento: state.apiReducer.alojamento,
    acesso: state.apiReducer.acesso,
    team: state.apiReducer.team,
    internalToken: state.apiReducer.internalToken
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
