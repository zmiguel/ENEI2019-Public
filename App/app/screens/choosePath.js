import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  FlatList
} from "react-native";
import moment from "moment";

import Modal from "react-native-modal";

import * as Progress from "react-native-progress";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as Actions from "../store/actions"; //Import your actionss
import AwesomeAlert from "react-native-awesome-alerts";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

import FitImage from "react-native-fit-image";

import { Divider } from "react-native-elements";

import LinearGradient from "react-native-linear-gradient";

import IconFA from "react-native-vector-icons/FontAwesome5";

class choosePath extends React.Component {
  _verifySession = Id => {
    var sessions = this.props.user.Sessions;
    for (let key in sessions) {
      if (sessions[key].Id == Id) return true;
      //  cenas.push(result[key]);
      console.log();
    }
  };
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "rgba(0,0,0,0)",
      shadowRadius: 0,
      elevation: 0
    }
  });

  state = {
    calendar: {},
    guest: "9"
  };

  _mount = () => {
    var sessions = this.props.sessions;

    for (let key in sessions) {
      if (sessions[key].Name == "IA") {
        this.setState({ guest: "9" });
      }
      if (sessions[key].Name == "IOT") {
        this.setState({ guest: "12" });
      }
      if (sessions[key].Name == "WEB") {
        this.setState({ guest: "14" });
      }
      if (sessions[key].Name == "MOB") {
        this.setState({ guest: "11" });
      }
      if (sessions[key].Name == "DS") {
        this.setState({ guest: "15" });
      }
      if (sessions[key].Name == "NET") {
        this.setState({ guest: "10" });
      }

    }
  };
  componentDidMount() {
    // this.props.getEvents(this.props.user);
    this.props.getAvailableGuestlists(this.props.token);
    this.props.getSessions(this.props.token);
    console.log(this.props.careerPath)
    this._mount();

    //console.log('didMount');
    // console.log(this.props.events);
  }

  _update = () => {
    this.setState({ user: this.props.user });
    console.log(this.props.events);
  };

  _findPath = id => {
    var sessions = this.props.sessions;

    for (let key in sessions) {
      if (sessions[key].Name == id) {
        return true;
      }
    }
    return false;
  };

  constructor() {
    super();
    this.state = {
      showAlert: true,
      Blocks: [],
      onHoldBlocks: true,
      checked: true,
      modalVisible: false,
      isModalVisible: false
    };

    this.data = [];
  }
  onPress = () => {};

  _s() {
    this.props.signSession(this.props.token, item[index].Id);
  }
  getCareerPaths = () => {
    this.props.getAvailableGuestlists(this.props.token);
    console.log(this.props.calendar);
  };
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _onPressItem = id => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _isRecommended(sessionId, careerPath) {
    switch (careerPath.code) {
      case "IA": {
        switch (sessionId) {
          case 15: {
            //AI1W
            return true;
          }
          case 63: {
            //AI1P
            return true;
          }
          case 64: {
            //AI2P
            return true;
          }
          case 65: {
            //AI2W
            return true;
          }
          case 14: {
            //AI3P
            return true;
          }
          case 20: {
            //AI4P
            return true;
          }
        }
        break;
      }

      case "NET": {
        switch (sessionId) {
          case 89: //CS1P
            return true;

          case 91: //CS2P
            return true;

          case 93: //CS1W
            return true;
          case 90: //CS3P
          return true;
          case 92://CS4P
            return true;

            case 94: //CS2W
            return true;

        }
        break;
      }

      case "WEB": {
        switch(sessionId){
          case 66: //WD1W
          return true;
          case 67: //WD1P
          return true;
          case 68: //WD2P
          return true;
          case 70://WD3P
          return true;
          case 71:  //WD4P
          return true;
          case 69: //WD2W
          return true;
        }
        break;
      }

      case "IOT": {
        switch(sessionId){
          case 83: //IoT1P
          return true;

          case 85: //IoT2P
          return true;
          case 87: //IoT1W
          return true;
          case 84:  //IoT3P
          return true;
          case 86: //IoT4P
          return true;
          case 88 : //IoT2W
          return true;
        }
        break;
      }

      case "MOB": {
        switch(sessionId){
          case 77: //MD1P
          return true;

          case 79: //MD2P
          return true;

          case 82: //MD1W
          return true;

          case 78:  //MD3P
          return true;

          case 80://MD4P
            return true;
          case 81: //MD2W
          return true;
        }
        break;
      }

      case "DS": {
        switch (sessionId){
          case 41: //DS1P
            return true;
          case 72: //DS2P
          return true; 
          case 73:  //DS1W
          return true;
          case 74: //DS3P
          return true;
          case 75: //DS5P
          return true;
          case 76:  //DS2W
          return true;
        }
        break;
      }
      break;
    }

    return false;
  }
  _render = ({ item }) => {
    <Text>Cenas: {item.Name}</Text>;
  };

  render() {
    const { navigate } = this.props.navigation;
    if(this.props.careerPath.code==""){
      return (
        <View>
         
          </View>
      );
    }
  
    return (
      <View>
      
        <ScrollView style={styles.page}>
          {this._findPath("IA") && (
            <LinearGradient
              colors={["#F54B10", "#F54B10"]}
              style={styles.linearGradient}
            >
              <Text
                style={{
                  margin: 10,
                  marginBottom: 0,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Empresa responsável:{" "}
              </Text>
              <View style={styles.companyContainer}>
                
                <View style={styles.companyLogo}>
                  <FitImage
                    source={{
                      uri:
                        "https://enei.pt/logos/critical-sponsor.png"
                    }}
                    style={styles.fitImage}
                  />
                </View>
                        
              </View>
            </LinearGradient>
          )}
            {this._findPath("NET") && (
            <LinearGradient
              colors={["#214198", "#214198"]}
              style={styles.linearGradient}
            >
              <Text
                style={{
                  margin: 10,
                  marginBottom: 0,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Empresa responsável:{" "}
              </Text>
              <View style={styles.companyContainer}>
                
                <View style={styles.companyLogo}>
                  <FitImage
                    source={{
                      uri:
                        "https://enei.pt/logos/accenture-logo.jpg"
                    }}
                    style={styles.fitImage}
                  />
                </View>
              </View>
            </LinearGradient>
          )}
         {this._findPath("WEB") && (
            <LinearGradient
              colors={["#3A1484", "#3A1484"]}
              style={styles.linearGradient}
            >
              <Text
                style={{
                  margin: 10,
                  marginBottom: 0,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Empresa responsável:{" "}
              </Text>
              <View style={styles.companyContainer}>
                
                <View style={styles.companyLogo}>
                  <FitImage
                    source={{
                      uri:
                        "https://enei.pt/logos/blip.png"
                    }}
                    style={styles.fitImage}
                  />
                </View>
              </View>
            </LinearGradient>
          )}
           {this._findPath("IOT") && (
            <LinearGradient
              colors={["#EC174A", "#EC174A"]}
              style={styles.linearGradient}
            >
              <Text
                style={{
                  margin: 10,
                  marginBottom: 0,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Empresa responsável:{" "}
              </Text>
              <View style={styles.companyContainer}>
                
                <View style={{ backgroundColor: "white",
    margin: 20,
    width: SCREEN_WIDTH * 0.40,
    borderRadius: 3,
    padding: 5,}}>
                  <FitImage
                    source={{
                      uri:
                        "https://enei.pt/logos/ubiwhere.png"
                    }}
                    style={styles.fitImage}
                  />
                </View>
              </View>
            </LinearGradient>
          )}
          {this._findPath("DS") && (
            <LinearGradient
              colors={["#DC160D", "#DC160D"]}
              style={styles.linearGradient}
            >
              <Text
                style={{
                  margin: 10,
                  marginBottom: 0,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Empresas responsáveis:{" "}
              </Text>
              <View style={styles.companyContainer}>
                
                <View style={{ backgroundColor: "white",
    margin: 20,
    width: SCREEN_WIDTH * 0.40,
    borderRadius: 3,
    padding: 5,}}>
                  <FitImage
                    source={{
                      uri:
                        "https://enei.pt/logos/feedzai.jpg"
                    }}
                    style={styles.fitImage}
                  />
                </View>
                <View style={styles.companyLogo}>
                  <FitImage
                    source={{
                      uri:
                        "https://enei.pt/logos/nova.png"
                    }}
                    style={styles.fitImage}
                  />
                </View>
              </View>
            </LinearGradient>
          )}
          {this._findPath("MOB") && (
            <LinearGradient
              colors={["#971384", "#971384"]}
              style={styles.linearGradient}
            >
              <Text
                style={{
                  margin: 10,
                  marginBottom: 0,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Empresa responsável:{" "}
              </Text>
              <View style={styles.companyContainer}>
                
                <View style={ {backgroundColor: "white",
    margin: 20,
    width: SCREEN_WIDTH * 0.45,
    borderRadius: 3,
    padding: 5,}}>
                  <FitImage
                    source={{
                      uri:
                        "https://enei.pt/logos/delloite.jpg"
                    }}
                    style={styles.fitImage}
                  />
                </View>
              </View>
            </LinearGradient>
          )}
          <View
            style={{
              flex: 1,
              width: SCREEN_WIDTH * 0.7,
              alignContent: "center"
            }}
          >
            <View style={styles.pickerCareer}>
              <Picker
                selectedValue={this.state.guest}
                style={{ width: "100%" }}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ guest: itemValue });
                  // this.props.timerChangeGuest();
                  this.props.waitChangeGuest();

                  this.props.changeGuestList(this.props.token, itemValue);

                  // this.props.waitChangeGuest();

                  // this.props.waitChangeGuest();

                  //  this.props.getSessionBlocks(this.props.sessions)
                }}
              >
                <Picker.Item label="Artificial Intelligence" value="9" />
                <Picker.Item label="Networking and Security" value="10" />
                <Picker.Item label="Data Science" value="15" />
                <Picker.Item label="Web Development" value="14" />
                <Picker.Item label="Mobile Development" value="11" />
                <Picker.Item label="Internet of Things" value="12" />
              </Picker>
            </View>
            <View style={{ width: SCREEN_WIDTH }}>
              {this.props.blocks == [] ||
                (this.props.blocks == {} && (
                  <View
                    style={{
                      flex: 1,
                      height: SCREEN_HEIGHT * 0.6,
                      alignSelf: "center"
                    }}
                  >
                    <ActivityIndicator
                      size="large"
                      color="red"
                      style={{
                        alignContent: "center",
                        alignSelf: "center",
                        marginTop: SCREEN_HEIGHT * 0.2
                      }}
                    />
                  </View>
                ))}
                      {
                        <View style={{ margin: 10, backgroundColor: "white" }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              color: "#CC1A17",
                              margin: 10
                            }}
                          >
                            Career Path
                          </Text>
                          <Text
                            style={{
                              margin: 10,
                              marginTop: 0,
                              marginBottom: 0,
                              textAlign: "justify",
                              lineHeight: 20
                            }}
                          >
                            Podes te inscrever em qualquer atividade.
                          </Text>
                          <Text
                            style={{
                              margin: 10,
                              marginTop: 0,
                              textAlign: "justify",
                              lineHeight: 20
                            }}
                          >
                            No entanto de modo a tirares o máximo proveito do
                            career path que escolheres, deves fazer a inscrição
                            nas palestras/workshops que são recomendadas.
                          </Text>
                          <View
                            style={{
                              padding: 5,
                              backgroundColor: "rgba(238, 238, 238,0.5)",
                              width: "60%",
                              alignItems: "center",
                              alignContent: "center",
                              alignSelf: "center",
                              margin: 20,
                              padding: 10
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row"
                                // width:'50%'
                              }}
                            >
                              <IconFA name="star" color={"#CC1A17"} size={20} />
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  marginLeft: 5
                                }}
                              >
                                Nome da sessão
                              </Text>
                            </View>
                            <Text
                              style={{
                                marginTop: 10,
                                marginBottom: 5
                              }}
                            >
                              100 Lugares disponíveis
                            </Text>

                            <Progress.Bar
                              color={"#000000"}
                              progress={0.3}
                              unfilledColor={"white"}
                              width={150}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 12,
                              textAlign: "center",
                              margin: 5,
                              color: "orange"
                            }}
                          >
                            Apenas podes estar inscrito em sessões que não
                            tenham horários coincidentes.
                          </Text>
                        </View>
                      }

              {!this.props.changingGuest && (
                <FlatList
                  data={this.props.Blocks}
                  renderItem={({ item, index }) => (
                    /* { (item[0].id== 16 //Ia
                      || item[0].id ==13 //NET
                      || item[0].id==3 //Ds
                      || item[0].id==11 //web
                      || item[0].id==4) //IOT
                      && <View><Text></Text></View>
                      */

                    <View>
                
                      {item[0].Id != 16 && //Ia
                      item[0].Id != 13 && //NET
                      item[0].Id != 3 && //Ds
                      item[0].Id != 11 && //web
                      item[0].Id != 4 && //IOT
                      item[0].Id != 2 && ( //MOB //IOT
                          <View>
                            <View
                              style={{
                                marginLeft: 10,
                                backgroundColor: "white",
                                marginTop: 10
                              }}
                            >
                              {moment(item[0].SessionStart).format("DD") ==
                                12 && (
                                <Text
                                  style={{
                                    padding: 10,
                                    fontWeight: "bold",
                                    fontSize: 18
                                  }}
                                >
                                  Sexta, dia 12
                                </Text>
                              )}
                              {moment(item[0].SessionStart).format("DD") ==
                                13 && (
                                <Text
                                  style={{
                                    padding: 10,
                                    fontWeight: "bold",
                                    fontSize: 18
                                  }}
                                >
                                  Sábado, dia 13
                                </Text>
                              )}
                              {moment(item[0].SessionEnd).format("DD") ==
                                14 && (
                                <Text
                                  style={{
                                    padding: 10,
                                    fontWeight: "bold",
                                    fontSize: 18
                                  }}
                                >
                                  Domingo, dia 14
                                </Text>
                              )}
                              {moment(item[0].SessionStart).format("DD") ==
                                15 && (
                                <Text
                                  style={{
                                    padding: 10,
                                    fontWeight: "bold",
                                    fontSize: 18
                                  }}
                                >
                                  Segunda, dia 15
                                </Text>
                              )}
                            </View>

                            <View style={styles.block}>
                              <View style={styles.time}>
                                <Text
                                  style={{
                                    margin: 10,
                                    fontSize: 25,
                                    color: "#CC1A17",
                                    marginBottom: 0
                                  }}
                                >
                                  {moment(item[0].SessionStart).format("HH:mm")}
                                </Text>
                                <Text style={{ marginLeft: 20 }}>às</Text>
                                <Text
                                  style={{
                                    margin: 10,
                                    fontSize: 25,
                                    color: "#CC1A17",
                                    marginTop: 5
                                  }}
                                >
                                  {moment(item[0].SessionEnd).format("HH:mm")}
                                </Text>
                              </View>
                              <View style={styles.sessions}>
                                <FlatList
                                  data={item}
                                  renderItem={({ data, index }) => (
                                    <View>
                                      <View style={styles.session}>
                                        {this._verifySession(
                                          item[index].Id
                                        ) && (
                                          <TouchableOpacity
                                            onPress={() => {
                                              this.props.removeSession(
                                                this.props.user,
                                                this.props.token,
                                                item[index].Id
                                              );
                                            }}
                                            style={{
                                              flex: 1,
                                              alignSelf: "center"
                                            }}
                                          >
                                            <View>
                                              <IconFA
                                                name="check-square"
                                                color={"#CC1A17"}
                                                size={35}
                                              />
                                            </View>
                                          </TouchableOpacity>
                                        )}
                                        {!this._verifySession(
                                          item[index].Id
                                        ) && (
                                          <TouchableOpacity
                                            onPress={() => {
                                              //this.props.waitChangeGuest()
                                              this.props.signSession(
                                                this.props.user,
                                                this.props.token,
                                                item[index].Id
                                              );
                                            }}
                                            style={{
                                              flex: 1,
                                              alignSelf: "center"
                                            }}
                                          >
                                            <View>
                                              <IconFA name="square" size={35} />
                                            </View>
                                          </TouchableOpacity>
                                        )}

                                        <TouchableOpacity
                                          onPress={() => {
                                            navigate("calendarDetail", {
                                              info: item[index]
                                            });
                                          }}
                                        >
                                          {!this._isRecommended(
                                            item[index].Id,
                                            this.props.careerPath
                                          ) && (
                                            <View style={{ margin: 5 }}>
                                              <Text
                                                style={{
                                                  fontSize: 15,
                                                  fontWeight: "bold",
                                                  maxWidth:150
                                                }}
                                             
                                              >
                                                {item[index].Name}
                                              </Text>
                                              <Text
                                                style={{
                                                  marginTop: 10,
                                                  marginBottom: 5
                                                }}
                                              >
                                                {item[index].MaxAttendees -
                                                  item[index].Enrolled}{" "}
                                                Lugares disponíveis
                                              </Text>
                                              {item[index].Enrolled != 0 &&
                                                item[index].MaxAttendees !=
                                                  0 && (
                                                  <Progress.Bar
                                                    color={"#000000"}
                                                    progress={
                                                      item[index].Enrolled /
                                                      item[index].MaxAttendees
                                                    }
                                                    unfilledColor={"white"}
                                                    width={150}
                                                  />
                                                )}
                                            </View>
                                          )}
                                          {this._isRecommended(
                                            item[index].Id,
                                            this.props.careerPath
                                          ) && (
                                            <View
                                              style={{
                                                padding: 5,
                                                backgroundColor:
                                                  "rgba(238, 238, 238,0.5)"
                                              }}
                                            >
                                              <View
                                                style={{
                                                  flex: 1,
                                                  flexDirection: "row"
                                                }}
                                              >
                                                <IconFA
                                                  name="star"
                                                  color={"#CC1A17"}
                                                  size={20}
                                                />
                                                <Text
                                                  style={{
                                                    fontSize: 15,
                                                    fontWeight: "bold",
                                                    marginLeft: 5,
                                                    maxWidth:150
                                                  }}
                                                >
                                                  {item[index].Name}
                                                </Text>
                                              </View>
                                              <Text
                                                style={{
                                                  marginTop: 10,
                                                  marginBottom: 5,
                                                  marginLeft:25
                                                }}
                                              >
                                                {item[index].MaxAttendees -
                                                  item[index].Enrolled}{" "}
                                                Lugares disponíveis
                                              </Text>
                                              {item[index].Enrolled != 0 &&
                                                item[index].MaxAttendees !=
                                                  0 && (
                                                  <Progress.Bar
                                                    color={"#000000"}
                                                    progress={
                                                      item[index].Enrolled /
                                                      item[index].MaxAttendees
                                                    }
                                                    unfilledColor={"white"}
                                                    width={150}
                                                    style={{marginLeft:25}}
                                                  />
                                                )}
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                      </View>

                                      <Divider
                                        style={{ backgroundColor: "#eeeeee" }}
                                      />
                                    </View>
                                  )}
                                />
                              </View>
                            </View>
                          </View>
                        )}
                    </View>
                  )}
                />
              )}
            </View>
          </View>

          {(this.props.changingGuest || this.props.Blocks == true) && (
            <View
              style={{
                flex: 1,
                height: SCREEN_HEIGHT * 0.6,
                alignSelf: "center"
              }}
            >
              <ActivityIndicator
                size="large"
                color="red"
                style={{
                  alignContent: "center",
                  alignSelf: "center",
                  marginTop: SCREEN_HEIGHT * 0.2
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  companyLogo: {
    backgroundColor: "white",
    margin: 20,
    width: SCREEN_WIDTH * 0.30,
    borderRadius: 3,
    padding: 5,
  
  },
  companyDescription: {
    //  backgroundColor:'white',
    margin: 20,
    marginRight: 0,
    width: SCREEN_WIDTH * 0.5,
    borderRadius: 3
  },
  sessionInfo: {
    margin: 5
  },
  sessionTitle: {
    fontSize: 15,
    fontWeight: "bold"
  },
  day: {
    margin: 10
  },
  dayText: {
    fontSize: 20,
    color: "#CC1A17",
    textAlign: "center"
  },
  time: {
    alignContent: "center",
    width: SCREEN_WIDTH * 0.23,
    backgroundColor: "white"
  },

  block: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "red",
    margin: 10,
    marginTop: 0,
    borderRadius: 5
  },

  companyContainer: {
    flex: 1,
    // backgroundColor:'blue',

    flexDirection: "row",
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop: 0
  },

  sessions: {
    flex: 1,
    flexDirection: "column",

    backgroundColor: "white"
  },

  page: {
    backgroundColor: "#eeeeee"
  },
  pickerCareer: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "white",
    width: SCREEN_WIDTH
  },
  session: {
    margin: 10,
    flex: 1,
    flexDirection: "row"
  }
});

function mapStateToProps(state, props) {
  return {
    // token: state.apiReducer.token,
    showAlert: state.apiReducer.showAlert,
    user: state.apiReducer.user,
    logged: state.apiReducer.logged,
    events: state.apiReducer.events,
    userDetails: state.apiReducer.userDetails,
    calendar: state.apiReducer.calendar,
    changingGuest: state.apiReducer.changingGuest,
    sessions: state.apiReducer.sessions,
    Blocks: state.apiReducer.Blocks,
    showAlert: state.apiReducer.showAlert,
    token: state.apiReducer.token,
    careerPath: state.apiReducer.careerPath
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(choosePath);
