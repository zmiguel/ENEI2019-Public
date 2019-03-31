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
  Keyboard,
  Switch,
  Alert
} from "react-native";
const axios = require("axios");
import ToggleSwitch from "toggle-switch-react-native";
import Modal from "react-native-modal";
import QRCodeScanner from "react-native-qrcode-scanner";
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
      addUser: false,
      switch: false,
      team: "",
      img:
        ""
    };
  }
  handleConnectivityChange = () => {
    console.log("asdasdasdasdasd");
  };

  _getImage = qr => {
    //enei.pt/api/Users/getProfileImage/ZV4ZWJXTVV
    https: axios
      .get(`https://enei.pt/api/Users/getProfileImage/${qr}`)
      .then(function(response) {
        // handle success
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("hold" + this.props.onHold);

    this.props.getUserInfo(this.props.token);

    this.props.getEvents(this.props.user, this.props.token);
    this._getImage();
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
    this.props.getEvents(this.props.user, this.props.token);
    this.props.getUserTeam(this.props.user, this.props.internalToken);
  };
  onSuccess = e => {
    //fecha o scanner
    this.props.addUserTeam(
      { id: this.props.team.id, newQr: e.data },
      this.props.internalToken,
      this.props.user
    );
    this.setState({ addUser: !this.state.addUser });
  };
  _rm = qr => {
    this.props.removeUserTeam(
      {
        TeamId: this.props.team.id,
        UserQR: this.props.team.cap.qRcode,
        UserToRemoveQR: qr
      },
      this.props.internalToken
    );
  };
  _toggle = () => {
    this.setState({ addUser: !this.state.addUser });
  };
  _delTeam = () => {
    Alert.alert(
      "Apagar equipa",
      "Tens a certeza que queres apagar a tua equipa?\n\nAo apagares a equipa, todos os dados serão perdidos... \n\nThere is no coming back..\n\n",
      [
        { text: "No, bring my mommy", onPress: () => alert("pussy!!!!") },

        {
          text: "YES",
          onPress: () =>
            this.props.deleteTeam(
              { TeamId: this.props.team.id, UserQr: this.props.user.Code },
              this.props.internalToken
            )
        }
      ],
      { cancelable: false }
    );
  };
  _creatTeam = () => {
    var tipo;
    if (this.state.switch) tipo = 1;
    else {
      tipo = 3;
    }
    var o = {
      EventId: tipo,
      Nome: this.state.team,
      capQR: this.props.user.Code
    };

    this.props.createTeam(o, this.props.internalToken, this.props.user);
  };
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
          <ScrollView
            style={{ backgroundColor: "#eeeeee", minHeight: SCREEN_HEIGHT }}
          >
            <View>
              <Modal
                isVisible={this.state.addUser}
                onBackdropPress={this._toggle}
                onBackButtonPress={this._toggle}
                animationInTiming={1100}
                animationOutTiming={1100}
                style={{ marginTop: -20 }}
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
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    margin: 10,
                    marginBottom: 5,
                    color: "white"
                  }}
                >
                  {" "}
                  Caso tenhas problemas com este processo deves contactar a
                  comissão organizadora atravês do email geral.
                </Text>
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
                   {this.props.user.Avatar != null && <Image
                      style={styles.userImage}
                      source={{
                        uri: this.props.user.Avatar
                      }}
                    />
                  }{ this.props.user.Avatar==null &&
                    <Image
                      style={styles.userImage}
                      source={require('../assets/logo_black.jpg')}
                    />}
                  </View>
                  {this.props.user != undefined && (
                    <Text style={styles.userText}>{this.props.user.Name}</Text>
                  )}
                  {this.props.user != undefined && (
                    <Text style={styles.userTextSub}>
                      {this.props.user.Company}
                    </Text>
                  )}
                </View>
              </ImageBackground>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  alignSelf:'center'
                }}
              >
                <Text
                  style={{ textAlign: "right", fontSize: 12, paddingTop:10 ,  marginRight:5}}
                >
                  Arrasta o ecrã para atualizar
                </Text>
                <IconFA
                  name="chevron-circle-down"
                  size={13}
                  color={"#CC1A17"}
                />
              </View>
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
              {this.props.team != undefined && this.props.team == "none" && (
                <View style={{ backgroundColor: "white", margin: 10 }}>
                  <View style={{ backgroundColor: "#CC1A17" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        margin: 10,
                        fontWeight: "bold",
                        marginBottom: 10
                      }}
                    >
                      Equipas Rally / Caching
                    </Text>
                  </View>
                  <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 12, textAlign: "center" }}>
                      Para participares no ENEI caching ou no Rally Tascas deves
                      formar uma equipa (4 a 6) elementos.
                    </Text>
                    <Text
                      style={{ fontSize: 12, textAlign: "center", margin: 5 }}
                    >
                      Ao criares a equipa, ficas como capitão. Podes adicionar e
                      remover outros elementos.
                    </Text>
                    <TextInput
                      style={{
                        borderColor: "#bfbdbd",
                        borderWidth: 1,
                        margin: 30,

                        width: SCREEN_WIDTH * 0.8,

                        backgroundColor: "white",

                        borderRadius: 3,
                        height: SCREEN_HEIGHT * 0.08,
                        borderColor: "#bfbdbd",
                        borderWidth: 1,
                        paddingLeft: SCREEN_WIDTH * 0.05
                      }}
                      onFocus={this._print}
                      maxLength={50}
                      blurOnSubmit={true}
                      onChangeText={t => this.setState({ team: t })}
                      clearButtonMode="always"
                      value={this.state.team}
                      clearTextOnFocus={true}
                      onSubmitEditing={Keyboard.dismiss}
                      placeholder="Nome da Equipa"
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        margin: 20,
                        marginBottom: 40,
                        alignSelf: "center"
                      }}
                    >
                      <View style={{ width: "33%", alignSelf: "center" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            textAlign: "center"
                          }}
                        >
                          ENEI Caching
                        </Text>
                      </View>
                      <ToggleSwitch
                        isOn={this.state.switch}
                        onColor="#CC1A17"
                        offColor="#eeeeee"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="large"
                        onToggle={isOn =>
                          this.setState({ switch: !this.state.switch })
                        }
                      />
                      <View style={{ width: "33%", alignSelf: "center" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            textAlign: "center"
                          }}
                        >
                          Rally Tascas
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{ fontSize: 12, textAlign: "center", margin: 5 }}
                    >
                      A incrição no Rally tem custo de 5€ por elemento. A equipa
                      apenas fica ativa quando efectuar o pagamento na banca no
                      ENEI
                    </Text>

                    <Button
                      onPress={this._creatTeam}
                      disabled={this.state.team == ""}
                      title={"Criar Equipa"}
                      color={"#CC1A17"}
                    />
                  </View>
                </View>
              )}
              {this.props.team != undefined && this.props.team != "none" && (
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
                      <View style={{ width: "60%" }}>
                        <Text
                          onPress={() => navigate("teamDetail")}
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
                      {this.props.team != undefined &&
                        this.props.team.cap.qRcode == this.props.user.Code && (
                          <TouchableOpacity onPress={this._delTeam}>
                            <View
                              style={{
                                alignItems: "center",
                                alignContent: "center",
                                alignSelf: "center",

                                margin: 10
                              }}
                            >
                              <IconFA
                                name="trash-alt"
                                color={"white"}
                                size={30}
                              />

                              <View>
                                <Text style={{ color: "white" }}>rm Team </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                      {this.props.team.nMembros < 6 &&
                        this.props.team.cap.qRcode == this.props.user.Code && (
                          <TouchableOpacity onPress={this._toggle}>
                            <View
                              style={{
                                alignItems: "center",
                                alignContent: "center",
                                alignSelf: "center",
                                margin: 10
                              }}
                            >
                              <IconFA name="plus" color={"white"} size={30} />

                              <View>
                                <Text style={{ color: "white" }}> Add</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                    </View>

                    <View>
                      <View style={{ flex: 1 }}>
                        <View>
                          <View style={styles.user}>
                            <View style={styles.userLogo}>
                              <IconFA name="user" size={40} />
                            </View>
                            <View style={styles.userT}>
                              <Text style={styles.userName}>
                                {this.props.team.cap.fullName}
                              </Text>
                              <Text>{this.props.team.cap.qRcode}</Text>
                            </View>

                            <View style={styles.userRemove}>
                              <Text
                                style={{ fontWeight: "bold", color: "#CC1A17" }}
                              >
                                Capitão
                              </Text>
                            </View>
                          </View>
                          <Divider style={{ backgroundColor: "black" }} />
                        </View>
                        <FlatList
                          data={this.props.team.membros}
                          renderItem={({ item }) => (
                            <View>
                              {item.id != this.props.team.cap.id && (
                                <View style={styles.user}>
                                  <View style={styles.userLogo}>
                                    <IconFA name="user" size={40} />
                                  </View>
                                  <View style={styles.userT}>
                                    <Text style={styles.userName}>
                                      {item.fullName}
                                    </Text>
                                    <Text>{item.qRcode}</Text>
                                  </View>

                                  {this.props.user.Code ==
                                    this.props.team.cap.qRcode && (
                                    <TouchableOpacity
                                      style={styles.userRemove}
                                      onPress={() => this._rm(item.qRcode)}
                                    >
                                      <Text style={{ fontWeight: "bold" }}>
                                        remover
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              )}
                              <Divider style={{ backgroundColor: "black" }} />
                            </View>
                          )}
                        />
                      </View>
                    </View>
                    <TouchableOpacity  onPress={() => navigate("teamDetail")} style={{backgroundColor:'orange'}}><Text style={{color:'white', fontSize:17, fontWeight:'bold', margin:10, textAlign:'center'}}>Ver o progresso da equipa </Text></TouchableOpacity>
                  </View>
               
                </View>
              )}
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
    height: Dimensions.get("window").height
  },
  titleBilhete: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10
  },
  colBilhete: {
    width: "33%",
    padding: 10,
    alignContent: "center",
    alignItems: "center"
  },
  boxStyle: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    marginBottom: 5,
    width: "100%",
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
