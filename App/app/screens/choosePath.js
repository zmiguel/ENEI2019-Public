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
import AwesomeAlert from 'react-native-awesome-alerts';


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
    }
  };
  componentDidMount() {
    // this.props.getEvents(this.props.user);
    this.props.getAvailableGuestlists(this.props.userDetails.token);
    this.props.getSessions(this.props.userDetails.token);
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
        showAlert:true,
      Blocks: [],
      onHoldBlocks: true,
      checked: true,
      modalVisible: false,
      isModalVisible: false,
    };

    this.data = [];
  }
  onPress = () => {
   
  };

  _s() {
    
    this.props.signSession(this.props.userDetails.token, item[index].Id);
  }
  getCareerPaths = () => {
    this.props.getAvailableGuestlists(this.props.userDetails.token);
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

  _render = ({ item }) => {
    <Text>Cenas: {item.Name}</Text>;
  };

  render() {
    return (
    <View>
        
      <ScrollView style={styles.page}>

        {this._findPath("IA") && (
          <LinearGradient
            colors={["#D95856", "#CC1A17"]}
            style={styles.linearGradient}
          >
            <Text
              style={{
                margin: 15,
                marginBottom: 0,
                fontWeight: "bold",
                color: "white"
              }}
            >
              {" "}
              Empresa responsável:{" "}
            </Text>
            <View style={styles.companyContainer}>
              <View style={styles.companyDescription}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    margin: 6,
                    color: "white"
                  }}
                >
                  Critical Software
                </Text>
                <Text style={{ margin: 6, marginTop: 0, color: "white" }}>
                  A CRITICAL Software fornece sistemas e serviços de software
                  para segurança e aplicações essenciais aos negócios.
                </Text>
              </View>
              <View style={styles.companyLogo}>
                <FitImage
                  source={{
                    uri:
                      "https://upload.wikimedia.org/wikipedia/commons/8/8a/CSW_Gradiente_rgb.png"
                  }}
                  style={styles.fitImage}
                />
              </View>
            </View>
          </LinearGradient>
        )}
        {this._findPath("NET") && (
          <LinearGradient
            colors={["#5887FF", "#715AFF"]}
            style={styles.linearGradient}
          >
            <Text
              style={{
                margin: 15,
                marginBottom: 0,
                fontWeight: "bold",
                color: "white"
              }}
            >
              {" "}
              Empresa responsável:{" "}
            </Text>
            <View style={styles.companyContainer}>
              <View style={styles.companyDescription}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    margin: 6,
                    color: "white"
                  }}
                >
                  Altice
                </Text>
                <Text style={{ margin: 6, marginTop: 0, color: "white" }}>
                  Altice é uma multinacional neerlandesa de telecomunicações,
                  conteúdos, media, entretenimento e publicidade.
                </Text>
              </View>
              <View style={styles.companyLogo}>
                <FitImage
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIfl0Km4mTbCGdJSr4bWn_ApFHnOrjYsmJ4VlBL1OkaIlb93t"
                  }}
                  style={styles.fitImage}
                />
              </View>
            </View>
          </LinearGradient>
        )}

        <View
          style={{ flex: 1, width: SCREEN_WIDTH * 0.7, alignContent: "center" }}
        >
          <View style={styles.pickerCareer}>
            <Picker
              selectedValue={this.state.guest}
              style={{ width: "100%" }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ guest: itemValue });
                this.props.timerChangeGuest();
                this.props.waitChangeGuest();

                this.props.changeGuestList(
                  this.props.userDetails.token,
                  itemValue
                );

                // this.props.waitChangeGuest();
                // this.props.getAvailableSessions(this.props.userDetails.token);

                // this.props.waitChangeGuest();

                //  this.props.getSessionBlocks(this.props.sessions)
              }}
            >
              <Picker.Item label="Escolhe o teu career path!" value="0" />
              <Picker.Item label="Inteligência Artificial" value="9" />
              <Picker.Item label="Redes e Segurança" value="10" />
              <Picker.Item label="Data Science" value="15" />
              <Picker.Item label="Desenvolvimento Web" value="14" />
              <Picker.Item label="Internet das Coisas" value="12" />
              <Picker.Item label="Desenvolvimento Mobile" value="11" />
            </Picker>
          </View>
          <View style={{ width: SCREEN_WIDTH }}>
            {!this.props.changingGuest && (
              <FlatList
                data={this.props.Blocks}
                renderItem={({ item, index }) => (
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
                              {this._verifySession(item[index].Id) && (
                                <TouchableOpacity
                                  onPress={() => {}}
                                  style={{ flex: 1, alignSelf: "center" }}
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
                              {!this._verifySession(item[index].Id) && (
                                <TouchableOpacity
                                  onPress={() => {
                                      this.props.waitChangeGuest()
                                    this.props.signSession(
                                      this.props.userDetails.token,
                                      item[index].Id
                                    );
                                  }}
                                  style={{ flex: 1, alignSelf: "center" }}
                                >
                                  <View>
                                    <IconFA name="square" size={35} />
                                  </View>
                                </TouchableOpacity>
                              )}

                              <TouchableOpacity
                                onPress={() =>
                                  this.props.navigation.navigate("febrada")
                                }
                              >
                                <View style={styles.sessionInfo}>
                                  <Text style={styles.sessionTitle}>
                                    {item[index].Name}
                                  </Text>
                                  <Text
                                    style={{ marginTop: 10, marginBottom: 5 }}
                                  >
                                    {item[index].MaxAttendees -
                                      item[index].Enrolled}{" "}
                                    Lugares disponíveis
                                  </Text>
                                  <Progress.Bar
                                    color={"#000000"}
                                    progress={
                                      item[index].Enrolled /
                                      item[index].MaxAttendees
                                    }
                                    unfilledColor={"white"}
                                    width={170}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>

                            <Divider style={{ backgroundColor: "#eeeeee" }} />
                          </View>
                        )}
                      />
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>

        {(this.props.changingGuest || this.props.Blocks == true) && (
          <ActivityIndicator
            size="large"
            color="red"
            style={{ flex: 1, alignContent: "center" }}
          />
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
    width: SCREEN_WIDTH * 0.35,
    borderRadius: 3,
    padding: 5
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
    borderRadius: 5
  },

  companyContainer: {
    flex: 1,
    // backgroundColor:'blue',

    flexDirection: "row",
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
    showAlert: state.apiReducer.showAlert
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(choosePath);
