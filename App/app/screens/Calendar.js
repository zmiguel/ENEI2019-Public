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
  Animated
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { RkButton, RkCard, RkText, RkTheme } from "react-native-ui-kitten";
import Timeline from "react-native-timeline-feed";

import * as Progress from "react-native-progress";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import PTRView from 'react-native-pull-to-refresh';
import * as Actions from "../store/actions"; //Import your actionss

const formatObj = obj => {
  let a = {};

  a.push({});

  return a;
};
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
class Calendar extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", weekDay: "sex", day: 12 },
      { key: "second", weekDay: "sab", day: 13 },
      { key: "third", weekDay: "dom", day: 14 },
      { key: "fourth", weekDay: "seg", day: 15 }
    ],
    CP: "SEM",
    cpColor: "white",
    careerPath: { name: "", color: "" }
  };

  componentDidMount() {


   // this.props.getSessions(this.props.token);

   // this.props.getEvents(this.props.user,this.props.careerPath);

  }

  _openDetails = () => {
    console.log("los");
  };

  renderDetail = ({ item, index }) => {
    const { navigate } = this.props.navigation;
    //  <Image source={{ uri:item.imageUrl, width:'100%' , height:100 }} style={{borderRadius:0}}/>
    return (
      <TouchableOpacity
        onPress={() => navigate("calendarDetail", { info: item })}
      >
        <View style={styles.event}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title]}>{item.name}</Text>
            <Text style={{ color: "black" }}>{item.place}</Text>
          </View>

          <View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _update = () => {
    this.setState({ user: this.props.user });
    console.log(this.props.events);
  };

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const bgcolor = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? "#CC1A17" : "rgba(0,0,0,0)"
            )
          });
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? "white" : "black"
            )
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Text style={{ color: "#7A7B7B" }}>
                {route.weekDay}
              </Text>
              <Animated.Text
                style={{
                  backgroundColor: bgcolor,
                  borderRadius: 0,
                  padding: 10,
                  marginTop: 5,
                  color: color,
                  fontSize: 15
                }}
              >
                {route.day}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  constructor() {
    super();
  }
  _refresh=()=>{
    this.props.getEvents(this.props.user,this.props.careerPath, this.props.token);

    
  }

  render() {
    const ThirdRoute = () => (
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.props.events != undefined && (
          <Timeline
            data={this.props.c}
            timeContainerStyle={{ marginTop: 0 }}
            timeStyle={{
              textAlign: "center",
              height: 100,
              color: "#CC1A17",
              padding: 5,
              fontSize: 23
            }}
            descriptionStyle={{ color: "red" }}
            renderDetail={this.renderDetail}
            lineColor="rgba(0,0,0,0)"
            lineWidth={1}
            separator={false}
            flatListProps={{
              style: {
                margin: 15
              }
            }}
            circleSize={0}
            dotColor={"#CC1A17"}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>
    );

    const FourthRoute = () => (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.props.events != undefined && (
          <Timeline
            data={this.props.d}
            timeContainerStyle={{ marginTop: 0 }}
            timeStyle={{
              textAlign: "center",
              // backgroundColor: 'red',

              height: 100,
              color: "#CC1A17",
              padding: 5,
              //marginTop:10,
              //  fontWeight:'bold',
              fontSize: 23

              //borderRadius: 13
            }}
            descriptionStyle={{ color: "red" }}
            renderDetail={this.renderDetail}
            lineColor="rgba(0,0,0,0)"
            lineWidth={1}
            separator={false}
            flatListProps={{
              style: {
                margin: 15
              }
            }}
            circleSize={0}
            dotColor={"#CC1A17"}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>
    );
    const FirstRoute = () => (
     
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.props.events != undefined && (
          <Timeline
            data={this.props.a}
            timeContainerStyle={{ marginTop: 0 }}
            timeStyle={{
              textAlign: "center",
              height: 100,
              color: "#CC1A17",
              padding: 5,
              fontSize: 23
            }}
            descriptionStyle={{ color: "red" }}
            renderDetail={this.renderDetail}
            lineColor="rgba(0,0,0,0)"
            lineWidth={1}
            separator={false}
            flatListProps={{
              style: {
                margin: 15
              }
            }}
            circleSize={0}
            dotColor={"#CC1A17"}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>
   
    );
    const SecondRoute = () => (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.props.events != undefined && (
          <Timeline
            data={this.props.b}
            timeContainerStyle={{ marginTop: 0 }}
            timeStyle={{
              textAlign: "center",

              height: 100,
              color: "#CC1A17",
              padding: 5,

              fontSize: 23

              //borderRadius: 13
            }}
            descriptionStyle={{ color: "red" }}
            renderDetail={this.renderDetail}
            lineColor="rgba(0,0,0,0)"
            lineWidth={1}
            separator={false}
            flatListProps={{
              style: {
                margin: 15
              }
            }}
            circleSize={0}
            dotColor={"#CC1A17"}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>
    );

    return (
     
      <View style={{ flex: 1 }}>

        <View>
          {this.props.careerPath != undefined && (
            <Text
              style={{
                backgroundColor: this.props.careerPath.color,
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                textAlign: "center",
                padding:15
              }}
            >
              {this.props.careerPath.name}
            </Text>
          )}
        </View>
     
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute,
            fourth: FourthRoute
          })}
          renderTabBar={this._renderTabBar}
          useNativeDriver={false}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
          style={{ backgroundColor: "#F2F2F2" }}
          indicatorStyle={{ backgroundColor: "pink"}}
        /><View style={{ alignContent:'center', alignItems:'center', backgroundColor:'transparent',position: 'absolute',marginTop:SCREEN_HEIGHT*0.75,marginLeft:10}}><Button onPress={this._refresh} title="Refresh" color="#CC1A17"
        /></View>
        
      </View>


      
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  details: {
    backgroundColor: "#FFFFFF",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    paddingTop: 0
  },
  description: {
    padding: 10,
    paddingLeft: 0,
    paddingTop: 0
  },
  title: {
    color: "#212121",
    fontWeight: "bold",
    fontSize: 15
  },
  titleContainer: {
    padding: 10
  },
  event: {
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginLeft: -25,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
    marginRight: 2
  },
  scene: {
    flex: 1
  },
  contentContainer: {
    //paddingVertical: 20,
    backgroundColor: "#F2F2F2"
  }
});
RkTheme.setType("RkCard", "story", {
  img: {
    height: 100,
    opacity: 0.7
  },
  header: {
    alignSelf: "center"
  },
  content: {
    alignSelf: "center"
  }
});

function mapStateToProps(state, props) {
  return {
    token: state.apiReducer.token,
    user: state.apiReducer.user,
    logged: state.apiReducer.logged,
    events: state.apiReducer.events,
    userDetails: state.apiReducer.userDetails,
    sessions: state.apiReducer.sessions,
    careerPath: state.apiReducer.careerPath,
    a: state.apiReducer.a,
    b: state.apiReducer.b,
    c: state.apiReducer.c,
    d: state.apiReducer.d
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);