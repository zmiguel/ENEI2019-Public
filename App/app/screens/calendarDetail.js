import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
  ListView,
  FlatList,
  ActivityIndicator,
  Linking,
  Platform
} from "react-native";

import moment from "moment";
import { Divider, Icon, Avatar } from "react-native-elements";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { RkButton, RkCard, RkText, RkTheme } from "react-native-ui-kitten";
import Timeline from "react-native-timeline-feed";

import * as Progress from "react-native-progress";

import NavAbsolute from "../components/Nav";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as Actions from "../store/actions"; //Import your actionss
import Swiper from "react-native-swiper";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

import FitImage from "react-native-fit-image";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const formatObj = obj => {
  let a = {};

  a.push({});

  return a;
};

class calendarDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavAbsolute
        navigation={navigation}
      // title={navigation.state.params.info.name}
      />
    )
  });

  state = {};

  componentDidMount() {
    this.props.getEvents(this.props.user, this.props.careerPath);

    const { navigation } = this.props;
    const info = navigation.getParam("info", "error");
    this.props.getSessionDetails(this.props.token, info.Id);
  }

  _update = () => {
    this.setState({ user: this.props.user });
    console.log(this.props.events);
  };

  constructor(props) {
    super(props);

    this.data = [];
  }


  render() {
    const { navigation } = this.props;
    const info = navigation.getParam("info", "error");

    if (this.props.sessionDetail == undefined) {
      return (<View style={{ flex: 1, alignSelf: 'center', margin: SCREEN_HEIGHT * 0.45 }}>
        <ActivityIndicator size="large" color="#CC1A17" />
      </View>

      )
    }

    return (
      info != undefined &&
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.coverContainer}>
                  <ImageBackground
                    source={{
                      uri: `https://tickets.enei.pt/adminpoint/Content/Images/Uploads/Sessions/${this.props.sessionDetail.Image}`
                    }}
                    style={styles.coverImage}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={styles.header}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center"
                  }}
                >
                  <View style={styles.timeText}>
                    <Text style={{ color: "#CC1A17", fontSize: 15 }}>
                      {`${moment(this.props.sessionDetail.SessionStart).format("HH:mm")}H - ${moment(this.props.sessionDetail.SessionEnd).format("HH:mm")}H`}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      margin: 10,
                      marginBottom: 0,
                      marginTop: 0,
                      fontSize: 20,
                      color: "#CC1A17"
                    }}
                  >
                    {this.props.sessionDetail.Name}
                  </Text>

                </View>

                <View style={{ margin: 10 }}>
                  {this.props.sessionDetail.Enrolled != 0 && this.props.sessionDetail.MaxAttendees != 0 &&
                    <Progress.Bar
                      color={"#000000"}
                      progress={this.props.sessionDetail.Enrolled / this.props.sessionDetail.MaxAttendees}
                      height={10}
                      unfilledColor={"white"}
                      width={210}
                    />}
                  <Text>
                    {this.props.sessionDetail.Enrolled} / {this.props.sessionDetail.MaxAttendees}
                  </Text>
                </View>
                {this.props.sessionDetail != undefined && (
                  <FlatList
                    data={this.props.sessionDetail.Speakers}
                    renderItem={({ item }) => (
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10
                          }}
                        >
                          <View style={{ width: 100, height: 100, padding: 5 }}>
                            <FitImage
                              source={{
                                uri:
                                  `https://tickets.enei.pt/adminpoint/Content/Images/Uploads/Speakers/${item.Photo}`
                              }}
                              style={{ padding: 5 }}
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                margin: 10
                              }}
                            >
                              {item.Name}
                            </Text>
                            <Text style={{ marginLeft: 10 }}>
                              {item.MoreInfo}
                            </Text>
                            <TouchableOpacity>
                              <Text
                                style={{ color: "#CC1A17", marginLeft: 10 }}
                              >
                                {item.Title}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "#CC1A17",
                              margin: 10,
                              marginBottom: 0,
                              fontSize: 15
                            }}
                          >
                            Descrição do orador:
                          </Text>
                          <Text style={{ margin: 10 }}>{item.Description}</Text>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>

              <View style={styles.block}>
                <Text
                  style={{ fontSize: 15, color: "#CC1A17", fontWeight: "bold" }}
                >
                  Descrição da palestra/workshop
                </Text>
                <Divider style={{ backgroundColor: "#000" }} />
                <View style={{ marginTop: 10 }}>
                  <Text>{this.props.sessionDetail.Description}</Text>
                </View>
              </View>
            </View>
          </View>
          {
            this.props.sessionDetail.LocalRoom != undefined && this.props.sessionDetail.LocalCoordinates != undefined &&

            <View style={styles.block}>
              <Text
                style={{ fontSize: 15, color: "#CC1A17", fontWeight: "bold" }}
              >
                Localização
            </Text>
              <Divider style={{ backgroundColor: "#000", marginBottom: 10 }} />
              <Text style={{marginBottom:20}}>{this.props.sessionDetail.LocalRoom}</Text>
              <Button
                 onPress={() => {
                  
                const scheme = Platform.select({
                  ios: "maps:0,0?q=",
                  android: "geo:0,0?q="
                });
                const latLng = this.props.sessionDetail.LocalCoordinates;
                const label = this.props.sessionDetail.LocalRoom;
                const url = Platform.select({
                  ios: `${scheme}${label}@${latLng}`,
                  android: `${scheme}${latLng}(${label})`
                });

                Linking.openURL(url);
              }}
                  title={"Abrir no Mapa"}
                  color={"#CC1A17"}
                />
            </View>
          }
        </ScrollView>
        <Divider style={{ backgroundColor: "black" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    marginTop: 15,

    backgroundColor: "white",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3
  },
  AttendeeContainer: {
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10
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

  icon: {
    justifyContent: "flex-start",
    marginTop: 2.8
  },

  nameAttendee: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
    marginBottom: 10
  },

  details: {
    marginTop: 20,
    flex: 1,
    alignSelf: "center"
  },

  infoRow: {
    margin: 25
  },

  ramoText: {
    alignSelf: "flex-start",
    marginBottom: 5,
    color: "white",
    fontSize: 17,
    fontWeight: "400"
  },

  timeText: {
    alignItems: "flex-end",
    flex: 2,
    lineHeight: 10,
    marginRight: 20
  },

  mainViewStyle: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column"
  },

  scroll: {
    backgroundColor: "#eee",
    flex: 1
    //marginBottom: 55,
  },

  header: {
    flex: 1,
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
  cardContainer: {
    flex: 1,
    padding: 10,
    //    margin: 20,
    backgroundColor: "white",
    borderRadius: 5
  },

  headerContainer: {
    flex: 1
  },

  container: {
    flex: 1,
    flexDirection: "column"
  },
  coverContainer: {
    position: "relative"
  },
  coverImage: {
    height: Dimensions.get("window").width * (2 / 4),
    width: Dimensions.get("window").width
  },
  /*headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
    },*/

  carreerPathContainer: {
    backgroundColor: "#CC1A17",
    height: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15
  },
  carreerPathText: {
    height: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  companyHeader: {
    backgroundColor: "#dddddd",
    // height:150,
    borderRadius: 5,
    margin: 10,
    padding: 10
  },
  companyTitle: {
    paddingBottom: 5,
    fontWeight: "bold",
    color: "#777777",
    fontSize: 17

    // padding:20
  },
  companyLogo: {
    borderRadius: 20
  },

  wrapper: {},
  company: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor:'red',
    color: "black"
  },

  companyLogoContainer: {
    flex: 1,
    justifyContent: "center",
    width: "60%",
    // backgroundColor:'white',
    margin: 20
  },
  aboutCompany: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state, props) {
  return {
    token: state.apiReducer.token,
    user: state.apiReducer.user,
    logged: state.apiReducer.logged,
    events: state.apiReducer.events,
    careerPath: state.apiReducer.careerPath,
    sessionDetail: state.apiReducer.sessionDetail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(calendarDetail);
