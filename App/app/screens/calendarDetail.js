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
  ImageBackground
} from "react-native";

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
    this.props.getEvents(this.props.user);
    console.log("didMount");
    console.log(this.props.events);
    const { navigation } = this.props;
    const info = navigation.getParam("info", "error");
    console.log("putas");
    console.log(info);
  }

  _update = () => {
    this.setState({ user: this.props.user });
    console.log(this.props.events);
  };

  constructor(props) {
    super(props);

    this.data = [];
  }

  renderHeader = info => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: info.imageUrl
            }}
            style={styles.coverImage}
          />
        </View>
      </View>
    );
  };

  renderDescription = info => {
    return (
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
                {info.time === info.timeEnd
                  ? info.time
                  : `${info.time}H - ${info.timeEnd}H`}
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
              {info.name}
            </Text>
            <Text style={{ marginLeft: 10 }}>Workshop</Text>
          </View>

          <View style={{ margin: 10 }}>
            <Progress.Bar
              color={"#000000"}
              progress={info.Enrolled / info.MaxAttendees}
              height={10}
              unfilledColor={"white"}
              width={210}
            />
            <Text>
              {info.Enrolled} / {info.MaxAttendees}
            </Text>
          </View>
          <Divider style={{ backgroundColor: "#eeeeee" }} />
          <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
            <View style={{ width: 100, height: 100, padding: 5 }}>
              <FitImage
                source={{
                  uri:
                    "http://enei2019.uingress.com/adminpoint/Content/Images/Uploads/Speakers/ffb043cb-3073-421c-a070-5d273b50fc23.jpeg"
                }}
                style={{ padding: 5 }}
              />
            </View>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>
                André Duarte
              </Text>
              <Text style={{ marginLeft: 10 }}>
                Project manager at ubiwhere
              </Text>
              <TouchableOpacity>
                <Text style={{ color: "#CC1A17", marginLeft: 10 }}>
                  website
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
            <Text style={{ margin: 10 }}>
              Existem muitas variações das passagens do Lorem Ipsum disponíveis,
              mas a maior parte sofreu alterações de alguma forma, pela injecção
              de humor, ou de palavras aleatórias que nem sequer parecem
              suficientemente credíveis.{" "}
            </Text>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={{ fontSize: 15, color: "#CC1A17", fontWeight:'bold' }}>Descrição da palestra/workshop</Text>
          <Divider style={{ backgroundColor: "#000" }} />
          <View style={{ marginTop: 10 }}>
            <Text>{info.description}</Text>
          </View>
        </View>
      </View>
    );
  };
  /*

    renderMap = () => {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{flex: 2}}
                region={{
                    latitude: 40.19092111672049,
                    latitudeDelta: 0.007664297080957283,
                    longitude: -8.410662319511175,
                    longitudeDelta: 0.007551424205303192
                }}
                onRegionChangeComplete={(region) => {

                    console.log(region);

                }}

            />
        )
    };
*/
  renderAttendee = () => {
    return (
      <View style={{ backgroundColor: "#fff", height: SCREEN_HEIGHT * 0.1 }}>
        <View style={styles.AttendeeContainer}>
          <View style={styles.leftRow}>
            <Avatar
              rounded
              size="medium"
              source={{
                uri:
                  "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
              }}
            />
          </View>
          <View style={styles.centerRow}>
            <Text style={styles.titleText} numberOfLines={1}>
              Nome do gajo
            </Text>
          </View>
          <View style={styles.rightRow}>
            <Icon
              size={24}
              name="visibility"
              type="material-icon"
              onPress={() => navigation.goBack(null)}
              color="#000"
              iconStyle={styles.icon}
              underlayColor="transparent"
              underlineColorAndroid="transparent"
              containerStyle={styles.iconContainer}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const info = navigation.getParam("info", "error");

    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              {this.renderHeader(info)}
            </View>
            {this.renderDescription(info)}
          </View>
          <View style={styles.block}>
            <Text style={{ fontSize: 15, color: "#CC1A17",fontWeight:'bold' }}>Localização</Text>
            <Divider style={{ backgroundColor: "#000", marginBottom: 10 }} />
            <Image source={require('../assets/img/campus.png')} style={{width:SCREEN_WIDTH*0.9}}></Image>
          </View>
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
    careerPath: state.apiReducer.careerPath
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(calendarDetail);
