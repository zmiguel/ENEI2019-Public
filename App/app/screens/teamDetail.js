/*
/*
/*
/*Esta página só está disponivel a 1 hora do rally..
*/

import * as React from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Icon } from "react-native-elements";

import * as Actions from "../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FitImage from "react-native-fit-image";
import PTRView from "react-native-pull-to-refresh";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import IconFA from "react-native-vector-icons/FontAwesome5";
class teamDetail extends React.Component {
  componentDidMount() {
    /* this.props.getEventLocsVisited(
      this.props.team.id,
      this.props.internalToken
    );*/

    console.log(this.props.locais);
  }

  constructor(props) {
    super(props);

    this.state = {
      nome: this.props.team.nome
    };
  }
  _update = () => {
    this.props.getEventLocsVisited(this.props.team.id, this.props.internalToken)
  };
  _alterTeamName = () => {};

  render() {
    const { navigate } = this.props.navigation;

    return (
      <PTRView onRefresh={this._update}>
        <ScrollView style={{ backgroundColor: "#eeeeee" }}>
          <View>
            <View style={styles.header}>
              <View
                style={{
                  backgroundColor: "#CC1A17",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center"
                }}
              >
                {this.props.user.Code == this.props.team.cap.qRcode && (
                  <View
                    style={{
                      alignItems: "center",
                      alignSelf: "center",
                      width: "100%",
                      flex: 1,
                      flexDirection: "row"
                    }}
                  >
                    <View style={{ width: "80%" }}>
                      <TextInput
                        style={{
                          height: 40,
                          borderColor: "white",
                          borderWidth: 1,
                          color: "white",
                          margin: 10,
                          padding: 10,
                          borderRadius: 3,
                          fontSize: 15
                        }}
                        onChangeText={n => this.setState({ nome: n })}
                        value={this.state.nome}
                      />
                    </View>

                    <TouchableOpacity
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        width: "20%",
                        alignContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text>Guardar</Text>
                      <IconFA name="user-edit" size={22} />
                    </TouchableOpacity>
                  </View>
                )}
                {this.props.user.Code != this.props.team.cap.qRcode && (
                  <View width={{ width: "100%", padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "#CC1A17",
                        textAlign: "center",
                        alignSelf: "center"
                      }}
                    >
                      {this.props.team.nome}
                    </Text>
                  </View>
                )}
                <View>
                  <Icon
                    name="md-trophy"
                    type="ionicon"
                    color="#CC1A17"
                    style={{
                      alignSelf: "center",
                      alignContent: "center"
                    }}
                  />
                  <Text style={styles.headerText}>
                    &nbsp; {this.props.team.pontos}
                  </Text>
                </View>
              </View>

              <View style={{ paddingBottom: 10 }}>
                <View style={styles.row}>
                  {this.props.team.membros && (
                    <FlatList
                      data={this.props.team.membros}
                      numColumns={6} // Número de colunas
                      renderItem={({ item }) => (
                        <View style={styles.memberImage}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../assets/logo_black.jpg")}
                          />
                          <Text
                            style={{
                              color: "#000"
                            }}
                          >
                            {item.fullName}
                          </Text>
                        </View>
                      )}
                    />
                  )}
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={{ flex: 1, width: "100%" }}>
                {this.props.locais && (
                  <FlatList
                    data={this.props.locais}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigate("eventDetail", { info: item, type: "rally" })
                        }
                      >
                        <View style={{ margin: 10 }}>
                          <View
                            style={{
                              backgroundColor: "white",
                              flex: 1,
                              flexDirection: "row",
                              padding: 15
                            }}
                          >
                            {/*Se bar estiver concluido, mostrar backgroundColor verde no container..*/}

                            <View style={{ height: 120, width: 120 }}>
                              <FitImage
                                source={{
                                  uri: item.location.squarePhoto
                                }}
                              />
                            </View>
                            <View style={{ width: "65%" }}>
                              <Text
                                style={{
                                  color: "#CC1A17",
                                  fontWeight: "bold",
                                  fontSize: 20,
                                  marginLeft: 15
                                }}
                              >
                                {item.location.nome}
                              </Text>
                              <Text style={{ fontSize: 12, padding: 15 }}>
                                {item.location.desc}
                              </Text>
                            </View>
                          </View>
                          {item.complete && (
                            <View
                              style={{
                                backgroundColor: "#CC1A17",
                                flex: 1,
                                flexDirection: "row",
                                alignContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                width: "100%",
                                paddingLeft: 15
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  margin: 3,
                                  textAlign: "center"
                                }}
                              >
                                Done
                              </Text>
                              <IconFA name="check" size={12} color={"white"} />
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </PTRView>
    );
  }
}

const styles = StyleSheet.create({
  triangleLeft: {
    width: 0,
    height: 0,
    backgroundColor: "#CC1A17",
    borderStyle: "solid",
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    backgroundColor: "#CC1A17",
    transform: [{ rotate: "90deg" }]
  },
  triangleRight: {
    width: 0,
    height: 0,
    backgroundColor: "#CC1A17",
    borderStyle: "solid",
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    backgroundColor: "#CC1A17",
    transform: [{ rotate: "-90deg" }],
    alignSelf: "flex-end"
  },
  header: {
    margin: 0,
    flex: 1,
    flexGrow: 1,
    flexDirection: "column"
  },
  container: {
    margin: 10,
    flex: 1,
    flexGrow: 1,
    flexDirection: "column"
  },

  row: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  headerText: {
    fontSize: 18,
    color: "#CC1A17",
    fontWeight: "bold"
  },

  centerRow: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 3,
    flexDirection: "column",
    justifyContent: "center"
  },

  leftRow: {
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "center"
  },
  rightRow: {
    alignItems: "flex-end",
    backgroundColor: "transparent",
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 4,
    alignSelf: "center"
  },

  memberImage: {
    flex: 1,
    marginRight: 4,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

function mapStateToProps(state, props) {
  return {
    token: state.apiReducer.token,
    user: state.apiReducer.user,
    team: state.apiReducer.team,
    internalToken: state.apiReducer.internalToken,
    eventsInternal: state.apiReducer.eventsInternal,
    locais: state.apiReducer.locais
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(teamDetail);
